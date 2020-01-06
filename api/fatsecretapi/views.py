# Create your views here.
from fatsecret import Fatsecret
from django.http import JsonResponse
from django.conf import settings

fs = Fatsecret(settings.FATSECRET_ACCESS_KEY, settings.FATSECRET_SECRET_KEY)

def foods(request):
    if request.method == 'GET':
        search = request.GET["search"]
        foods_detail = []
        try:
            foods_detail = fs.foods_search(search, max_results=50, page_number=1)
        except:
            foods_detail = {"error": "An error occured while processing."}
        response = JsonResponse({"results":foods_detail})
        return response
    elif request.method == 'POST':
        response = JsonResponse({"error": "must be a get method"})
        return response

def food(request):
    if request.method == 'GET':
        search = request.GET["search"]
        foods = []
        try:
            foods = fs.food_get(search)
        except Exception as ex:
            print(ex)
            foods = {"error": "An error occured while processing."}
        response = JsonResponse({"results":foods})
        return response
    elif request.method == 'POST':
        response = JsonResponse({"error": "must be a get method"})
        return response

def recipes(request):
    if request.method == 'GET':
        search = request.GET["search"]
        recipes_result = []
        try:
            recipes_result = fs.recipes_search(search, max_results=50, page_number=1)
        except Exception as ex:
            print(ex)
            recipes_result = {"error": "An error occured while processing."}
        response = JsonResponse({"results":recipes_result})
        return response
    elif request.method == 'POST':
        response = JsonResponse({"error": "must be a get method"})
        return response


def recipe(request):
    if request.method == 'GET':
        search = request.GET["search"]
        recipe_result = []
        try:
            recipe_result = fs.recipe_get(search)
        except Exception as ex:
            print(ex)
            recipe_result = {"error": "An error occured while processing."}
        response = JsonResponse({"results":recipe_result})
        return response
    elif request.method == 'POST':
        response = JsonResponse({"error": "must be a get method"})
        return response



