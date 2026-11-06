resource "google_compute_instance" "tf_instance_1" {
  name         = "tf-instance-1"
  machine_type = "e2-standard-2"
  zone         = "us-east1-c"

  boot_disk {
    initialize_params {
      image = "projects/debian-cloud/global/images/debian-12-bookworm-v20261102"
    }
  }

  network_interface {
    network    = "tf-vpc-265332"
    subnetwork = "subnet-01"
  }

  allow_stopping_for_update = true
}

resource "google_compute_instance" "tf_instance_2" {
  name         = "tf-instance-2"
  machine_type = "e2-standard-2"
  zone         = "us-east1-c"

  boot_disk {
    initialize_params {
      image = "projects/debian-cloud/global/images/debian-12-bookworm-v20261102"
    }
  }

  network_interface {
    network    = "tf-vpc-265332"
    subnetwork = "subnet-02"
  }

  allow_stopping_for_update = true
}
