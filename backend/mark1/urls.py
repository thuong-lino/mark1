from django.conf.urls import include
from django.urls import path
from django.contrib import admin

import django_js_reverse.views
from rest_framework.routers import DefaultRouter
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

from common.routes import routes as common_routes

router = DefaultRouter()

routes = common_routes
for route in routes:
    router.register(route['regex'], route['viewset'],
                    basename=route['basename'])

urlpatterns = [
    path("", include("common.urls"), name="common"),
    path("api/", include("api.urls"), name="api"),
    path("admin/", admin.site.urls, name="admin"),
    path("jsreverse/", django_js_reverse.views.urls_js, name="js_reverse"),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls'), name='rest_auth'),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path("api/", include(router.urls), name="api"),

]
