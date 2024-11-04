from setuptools import setup, find_packages

setup(
    name="rt-fads",
    version="0.1.0",
    author="Chen Xingqiang",
    author_email="chen.xingqiang@iechor.com",
    description="Real-time Financial Anti-fraud Detection System based on Secretflow",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "secretflow>=1.0.0",
        "torch>=2.0.0",
        "numpy>=1.20.0",
        "pandas>=1.3.0",
        "scikit-learn>=1.0.0"
    ],
    python_requires=">=3.8",
)
