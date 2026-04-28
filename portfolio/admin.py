from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Profile, Role,Resume,Education,Experience, Project, Certificate
 
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("title",)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "title",
        "city",
        "email",
        "freelance",
    )


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("summary_name", "email")
    search_fields = ("summary_name", "email")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "year", "institute")
    search_fields = ("degree", "institute")
    list_filter = ("year",)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "year")
    search_fields = ("title", "company")
    list_filter = ("year",)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ("title", "category")


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ("title", "category")
