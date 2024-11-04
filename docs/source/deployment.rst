Deployment Guide
==============

Prerequisites
------------

* Python 3.8+
* CUDA 11.0+ (for GPU support)
* Docker
* Kubernetes 1.19+
* Helm 3.0+

Installation
-----------

Using pip::

    pip install rt-fads

Using Docker::

    docker pull chenxingqiang/rt-fads:latest

Kubernetes Deployment
-------------------

1. Create namespace::

    kubectl create namespace fraud-detection

2. Deploy configuration::

    kubectl apply -f deployment/k8s/config.yaml

3. Deploy application::

    kubectl apply -f deployment/k8s/deployment.yaml

Configuration
------------

Environment Variables
^^^^^^^^^^^^^^^^^^

* ``MODEL_PATH``: Path to model checkpoint
* ``CONFIG_PATH``: Path to configuration file
* ``LOG_LEVEL``: Logging level (DEBUG, INFO, WARNING, ERROR)
* ``API_KEY``: API authentication key

Security
--------

1. Enable SSL/TLS::

    kubectl apply -f deployment/k8s/tls-secret.yaml

2. Configure authentication::

    kubectl apply -f deployment/k8s/auth-config.yaml

3. Set up network policies::

    kubectl apply -f deployment/k8s/network-policy.yaml