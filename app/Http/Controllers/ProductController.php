<?php
namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ProductController extends Controller
{
    function index() {
        return response()->json(Product::all(), 200);
    }

    function show($id) {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        return response()->json($product, 200);
    }

    function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePictureUrl = null;
        if ($request->hasFile('image')) {
            $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
            $imagePictureUrl = $uploadedFileUrl;
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $imagePictureUrl,
        ]);

        return response()->json($product, 201);
    }

    function update(Request $request, $id) {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $validationRules = [
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
        ];

        // Solo validamos la imagen si se envió una nueva
        if ($request->hasFile('image')) {
            $validationRules['image'] = 'image|mimes:jpg,jpeg,png|max:2048';
        }

        $request->validate($validationRules);

        $data = $request->only(['name', 'description', 'price', 'stock']);
        
        if ($request->hasFile('image')) {
            $uploadedFileUrl = Cloudinary::upload($request->file('image')->getRealPath())->getSecurePath();
            $data['image'] = $uploadedFileUrl;
        }

        $product->update($data);
        return response()->json($product, 200);
    }

    function destroy($id) {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}