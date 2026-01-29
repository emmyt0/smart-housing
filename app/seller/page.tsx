"use client";

import { useState } from "react";
import { Upload, X, Check, Home, MapPin, Hash, MessageSquare } from "lucide-react";
import Navbar from "../components/Navbar";

export default function SellerPage() {
  const [formData, setFormData] = useState({
    propertyType: "",
    price: "",
    description: "",
    address: "",
    details: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyTypes = ["Studio (1+0)", "1+1 Apartment", "2+1 Apartment", "3+1 Apartment", "House"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach(file => {
      newImages.push(URL.createObjectURL(file));
      newPreviews.push(URL.createObjectURL(file));
    });

    setImages(prev => [...prev, ...newImages]);
    setPreviewImages(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Property listed successfully!");
      setFormData({
        propertyType: "",
        price: "",
        description: "",
        address: "",
        details: "",
      });
      setImages([]);
      setPreviewImages([]);
      setIsSubmitting(false);
    }, 1500);
  };

  const addQuickDetail = (detail: string) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details ? `${prev.details} • ${detail}` : detail
    }));
  };

  const quickDetails = [
    "Water & electricity included",
    "Fully furnished",
    "WiFi available",
    "24/7 Security",
    "Parking available",
    "Close to EUL",
    "Quiet neighborhood",
    "Shared laundry"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Property</h1>
          <p className="text-gray-600">Reach thousands of EUL students looking for accommodation</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Type */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <Home className="w-4 h-4" />
                Property Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {propertyTypes.map(type => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setFormData(prev => ({ ...prev, propertyType: type }))}
                    className={`px-4 py-3 rounded-lg border transition-all ${formData.propertyType === type 
                      ? 'border-gray-900 bg-gray-900 text-white' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <Hash className="w-4 h-4" />
                Monthly Price (₺)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 8,500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                  required
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">/month</span>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <MapPin className="w-4 h-4" />
                Address near EUL
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g., Lefke Center, 5 mins walk to EUL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <MessageSquare className="w-4 h-4" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property... e.g., 'Fully furnished studio with balcony and modern kitchen'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition min-h-[100px] resize-none"
                required
              />
            </div>

            {/* Quick Details */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                Property Features
              </label>
              <p className="text-sm text-gray-600 mb-3">Click to add common features (appear as • separated)</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickDetails.map(detail => (
                  <button
                    type="button"
                    key={detail}
                    onClick={() => addQuickDetail(detail)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                  >
                    + {detail}
                  </button>
                ))}
              </div>
              <input
                type="text"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Features appear here as • separated list"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <Upload className="w-4 h-4" />
                Property Images
              </label>
              
              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {previewImages.map((src, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${src})` }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Area */}
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload images</p>
                  <p className="text-xs text-gray-500">Upload up to 8 photos of your property</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 text-white font-medium py-3.5 rounded-lg hover:bg-black transition-colors duration-200 text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Publish Listing
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Your listing will be visible to EUL students within 24 hours. 
            Make sure all information is accurate.
          </p>
        </div>
      </div>
    </div>
  );
}