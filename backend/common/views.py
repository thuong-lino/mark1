from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class IndexView(LoginRequiredMixin, generic.TemplateView):
    login_url = "/login/"
    redirect_field_name = 'redirect_to'
    template_name = 'common/index.html'


class LoginView(generic.TemplateView):
    template_name = "common/login.html/"


class RestViewSet(viewsets.ViewSet):
    @action(
        detail=False,
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='rest-check',
    )
    def rest_check(self, request):
        return Response(
            {"result": "If you're seeing this, the REST API is working!"},
            status=status.HTTP_200_OK,
        )
