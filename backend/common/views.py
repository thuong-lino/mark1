from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class IndexView(LoginRequiredMixin, generic.TemplateView):
    login_url = "/login/"
    template_name = 'common/index.html'


class LoginView(generic.TemplateView):
    template_name = "common/login.html/"

    def get(self, request, *args, **kwargs):
        if(request.user.is_authenticated):
            return redirect('/')
        return super().get(request, *args, **kwargs)


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
