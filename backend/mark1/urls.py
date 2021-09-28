from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from users.views import FacebookLogin
from rest_framework_jwt.views import obtain_jwt_token

import django_js_reverse.views
from rest_framework.routers import DefaultRouter

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
    path('api-token-auth/', obtain_jwt_token),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path("api/", include(router.urls), name="api"),
]
