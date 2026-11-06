resource "google_storage_bucket" "bucket" {
  name                        = "tf-bucket-608366"
  project                     = var.project_id
  location                    = "US"
  force_destroy               = true
  uniform_bucket_level_access = true
}
