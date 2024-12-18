# Configuration file for Sphinx documentation

project = 'RT-FADS'
copyright = '2024, Xu xiaoheng,Chen Xingqiang'
author = 'Xu xiaoheng,Chen Xingqiang'

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.viewcode',
    'sphinx.ext.githubpages',
    'sphinx_rtd_theme',
    'nbsphinx'
]

templates_path = ['_templates']
exclude_patterns = []
html_theme = 'sphinx_rtd_theme'
