Developer Guide
=============

Setup Development Environment
--------------------------

1. Clone Repository::

    git clone https://github.com/chenxingqiang/rt-fads.git
    cd rt-fads

2. Create Virtual Environment::

    python -m venv venv
    source venv/bin/activate  # Linux/Mac
    venv\Scripts\activate  # Windows

3. Install Dependencies::

    pip install -r requirements-dev.txt

Development Workflow
------------------

1. Code Style
~~~~~~~~~~~~

Follow PEP 8 and use provided linting tools::

    # Run linting
    black src/ tests/
    isort src/ tests/
    flake8 src/ tests/

2. Testing
~~~~~~~~~

Write and run tests::

    # Run all tests
    pytest tests/

    # Run specific test
    pytest tests/test_model.py -k test_prediction

3. Documentation
~~~~~~~~~~~~~~

Update documentation::

    # Generate API documentation
    sphinx-apidoc -o docs/source src/rt_fads

    # Build documentation
    cd docs
    make html

Contributing Guidelines
--------------------

1. Create Branch::

    git checkout -b feature/your-feature-name

2. Make Changes::

    # Make changes
    # Write tests
    # Update documentation

3. Submit PR::

    # Push changes
    git push origin feature/your-feature-name

    # Create pull request
    # Add description and tests results