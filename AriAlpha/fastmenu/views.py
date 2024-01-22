from django.shortcuts import render


# Create your views here.
def fastmenu(request):
    return render(
        request,
        "fastmenu/fastmenu.html",
    )
