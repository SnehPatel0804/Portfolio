from django.shortcuts import render, get_object_or_404
from portfolio.models import Profile,Role,Resume,Education,Experience,Project, Certificate
# Create your views here.


def home(request):
    profile = Profile.objects.first()
    roles = Role.objects.all()
    resume = Resume.objects.first()
    educations = Education.objects.all()
    experiences = Experience.objects.all()

    return render(request, "pages/home.html", {
        "profile": profile,
        "roles": roles,
        "resume": resume,
        "educations": educations,
        "experiences": experiences,
        "projects": Project.objects.all(),
        "certificates": Certificate.objects.all(),
    })

 


def project_detail(request, slug):
    project = get_object_or_404(Project, slug=slug)
    return render(request, "pages/projects.html", {
        "item": project,
        "type": "project"
    })


def certificate_detail(request, slug):
    certificate = get_object_or_404(Certificate, slug=slug)
    return render(request, "pages/certificates.html", {
        "item": certificate,
        "type": "certificate"
    })

