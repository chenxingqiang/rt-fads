System Architecture
=================

High-Level Architecture
--------------------

.. image:: _static/architecture.png
   :width: 800
   :alt: System Architecture Diagram

Components
---------

Core Components
^^^^^^^^^^^^^

1. MT-HGNN Model
~~~~~~~~~~~~~~~

The MT-HGNN (Multi-scenario Temporal Heterogeneous Graph Neural Network) is the core model responsible for fraud detection:

* Dynamic feature updating
* Scene-aware attention mechanism
* Temporal dependency modeling
* Multi-head self-attention

Code example::

    from rt_fads.models import MTHGNN
    
    model = MTHGNN(config)
    predictions = model(features, edge_index, edge_attr)

2. Feature Processing
~~~~~~~~~~~~~~~~~~~

The system includes comprehensive feature processing capabilities:

* Real-time feature extraction
* Graph construction
* Temporal feature processing
* Scene feature engineering

3. Privacy Protection
~~~~~~~~~~~~~~~~~~~

Privacy-preserving computation is implemented using:

* Secretflow framework integration
* Differential privacy
* Secure multi-party computation
* Homomorphic encryption

4. Monitoring System
~~~~~~~~~~~~~~~~~~

Comprehensive monitoring includes:

* Performance metrics
* Model metrics
* System health
* Security monitoring