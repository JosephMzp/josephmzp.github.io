import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { JSDOM } from 'jsdom'

const SITIO = '_site'
let doc

beforeAll(() => {
  const html = readFileSync(`${SITIO}/index.html`, 'utf-8')
  doc = new JSDOM(html).window.document
})

describe('index.html', () => {
  it('tiene un título', () => {
    expect(doc.title.trim()).not.toBe('')
  })

  it('muestra mi nombre en el h1', () => {
    expect(doc.querySelector('h1')?.textContent).toContain('Joseph Miguel Zavaleta Polo')
  })

  it('todas las imágenes tienen texto alternativo', () => {
    const sinAlt = [...doc.querySelectorAll('img')].filter((img) => !img.getAttribute('alt'))
    expect(sinAlt).toHaveLength(0)
  })

  it('los archivos locales que usa la página existen', () => {
    const rutas = [...doc.querySelectorAll('script[src], link[rel="stylesheet"], img[src]')]
      .map((el) => el.getAttribute('src') ?? el.getAttribute('href'))
      .filter((ruta) => !/^(https?:)?\/\//.test(ruta))
    for (const ruta of rutas) {
      expect(existsSync(`${SITIO}/${ruta}`), `falta ${ruta}`).toBe(true)
    }
  })
})

describe('Pruebas adicionales del LAB-03', () => {
  it('declara el idioma en español', () => {
    expect(doc.documentElement.getAttribute('lang')).toBe('es')
  })

  it('declara el charset UTF-8', () => {
    expect(doc.querySelector('meta[charset]')?.getAttribute('charset')).toBe('UTF-8')
  })

  it('tiene la etiqueta viewport para móviles', () => {
    expect(doc.querySelector('meta[name="viewport"]')).not.toBeNull()
  })

  it('tiene exactamente un solo h1', () => {
    expect(doc.querySelectorAll('h1')).toHaveLength(1)
  })

  it('la sección del libro de visitas tiene los campos nombre y mensaje', () => {
    expect(doc.querySelector('#nombre')).not.toBeNull()
    expect(doc.querySelector('#mensaje')).not.toBeNull()
  })
})

describe('el sitio que se publica', () => {
  it('no incluye archivos internos del repositorio', () => {
    for (const interno of ['compose.yaml', '.env.example', 'api', 'db', 'tests']) {
      expect(existsSync(`${SITIO}/${interno}`), `${interno} no debería publicarse`).toBe(false)
    }
  })
})