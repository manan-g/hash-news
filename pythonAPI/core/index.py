import algoliasearch_django as algoliasearch

from .models import Article

algoliasearch.register(Article)


