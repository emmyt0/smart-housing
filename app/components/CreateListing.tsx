"use client";

import { useState } from "react";
import { Upload, X, Check, Home, MapPin, Hash, MessageSquare, Calendar, Bed, Users, Star } from "lucide-react";

type CreateListingProps = {
  onSubmit?: (formData: ListingFormData) => void;
  isLoading?: boolean;
};

type ListingFormData = {
  propertyType: string;
  price: string;
  description: string;
  address: string;
  details: string;
  availability: string;
  availableRooms: string;
  bedType: string;
  bedCount: string;
  totalBedsInRoom: string;
  availabilityDate?: string;
};

export default function CreateListing({ onSubmit, isLoading = false }: CreateListingProps) {
  const [formData, setFormData] = useState<ListingFormData>({
    propertyType: "",
    price: "",
    description: "",
    address: "",
    details: "",
    availability: "",
    availableRooms: "",
    bedType: "",
    bedCount: "",
    totalBedsInRoom: "",
  });
  
  const [primaryImage, setPrimaryImage] = useState<string>("");
  const [secondaryImages, setSecondaryImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<{ primary?: string; secondary: string[] }>({ secondary: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyTypes = ["Studio (1+0)", "1+1 Apartment", "2+1 Apartment", "3+1 Apartment", "House", "Single Room"];
  const bedTypes = ["Single Bed", "Double Bed", "Bunk Bed", "Shared Bed", "No Bed"];
  const availabilityOptions = ["Immediately", "Next Month", "Flexible", "Specific Date"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrimaryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPrimaryImage(imageUrl);
    setImagePreviews(prev => ({ ...prev, primary: imageUrl }));
  };

  const handleSecondaryImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const newPreviews: string[] = [];

    Array.from(files).slice(0, 7).forEach(file => {
      newImages.push(URL.createObjectURL(file));
      newPreviews.push(URL.createObjectURL(file));
    });

    setSecondaryImages(prev => [...prev, ...newImages]);
    setImagePreviews(prev => ({ ...prev, secondary: [...prev.secondary, ...newPreviews] }));
  };

  const removePrimaryImage = () => {
    setPrimaryImage("");
    setImagePreviews(prev => ({ ...prev, primary: undefined }));
  };

  const removeSecondaryImage = (index: number) => {
    setSecondaryImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => ({
      ...prev,
      secondary: prev.secondary.filter((_, i) => i !== index)
    }));
  };

  const setSecondaryAsPrimary = (index: number) => {
    if (imagePreviews.secondary[index]) {
      setPrimaryImage(secondaryImages[index]);
      setImagePreviews(prev => ({ ...prev, primary: imagePreviews.secondary[index] }));
      removeSecondaryImage(index);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Default submit behavior if no onSubmit prop provided
      setTimeout(() => {
        alert("Property listed successfully!");
        resetForm();
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({
      propertyType: "",
      price: "",
      description: "",
      address: "",
      details: "",
      availability: "",
      availableRooms: "",
      bedType: "",
      bedCount: "",
      totalBedsInRoom: "",
    });
    setPrimaryImage("");
    setSecondaryImages([]);
    setImagePreviews({ secondary: [] });
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
    "Shared laundry",
    "Private bathroom",
    "Study desk",
    "Balcony",
    "Air conditioning"
  ];

  // Calculate completion percentage for progress bar
  const calculateCompletion = () => {
    const totalFields = 8; // primary image + 7 main fields
    let completed = imagePreviews.primary ? 1 : 0;
    
    // Check main required fields
    const requiredFields = ['propertyType', 'price', 'description', 'address'];
    completed += requiredFields.filter(field => formData[field as keyof ListingFormData]).length;
    
    // Additional fields
    if (formData.availability) completed += 1;
    if (formData.details) completed += 1;
    if (imagePreviews.secondary.length >= 1) completed += 1;
    
    return Math.round((completed / totalFields) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-900">
          List Your Property
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Reach thousands of EUL students looking for accommodation. Fill in all details for better visibility.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column - Main Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Home className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Property Details</h2>
                <p className="text-gray-600 text-sm">Complete all fields for a perfect listing</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Property Type & Availability Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Property Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                    <Home className="w-4 h-4" />
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map(type => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData(prev => ({ ...prev, propertyType: type }))}
                        className={`px-4 py-3 rounded-lg border transition-all text-sm ${formData.propertyType === type 
                          ? 'border-blue-600 bg-blue-600 text-white shadow-sm' 
                          : 'border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                    <Calendar className="w-4 h-4" />
                    Availability
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availabilityOptions.map(option => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setFormData(prev => ({ ...prev, availability: option }))}
                        className={`px-4 py-3 rounded-lg border transition-all text-sm ${formData.availability === option 
                          ? 'border-blue-600 bg-blue-600 text-white shadow-sm' 
                          : 'border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {formData.availability === "Specific Date" && (
                    <input
                      type="date"
                      name="availabilityDate"
                      onChange={handleInputChange}
                      className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                    />
                  )}
                </div>
              </div>

              {/* Room & Bed Information */}
              {formData.propertyType === "Single Room" && (
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Room Sharing Details</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Available Rooms
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map(num => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setFormData(prev => ({ ...prev, availableRooms: num.toString() }))}
                            className={`px-4 py-2 rounded-lg border transition-all ${formData.availableRooms === num.toString()
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-gray-300 text-gray-700 hover:border-blue-400'}`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        <Bed className="w-4 h-4 inline mr-1" />
                        Bed Type
                      </label>
                      <select
                        name="bedType"
                        value={formData.bedType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition appearance-none bg-white"
                      >
                        <option value="">Select bed type</option>
                        {bedTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Beds in Room
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          name="bedCount"
                          value={formData.bedCount}
                          onChange={handleInputChange}
                          placeholder="Your bed"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        />
                        <span className="text-gray-500">/</span>
                        <input
                          type="number"
                          name="totalBedsInRoom"
                          value={formData.totalBedsInRoom}
                          onChange={handleInputChange}
                          placeholder="Total beds"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {formData.bedCount && formData.totalBedsInRoom 
                          ? `Sharing with ${Number(formData.totalBedsInRoom) - Number(formData.bedCount)} other person(s)`
                          : "Enter bed counts for sharing info"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Price & Address Grid */}
              <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition pl-12"
                      required
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <span className="text-lg">₺</span>
                    </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
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
                  placeholder="Describe your property in detail... Include amenities, furniture, rules, and any special features that make your property unique."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition min-h-[120px] resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">Minimum 50 characters for better engagement</p>
              </div>

              {/* Quick Details */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                  Property Features
                </label>
                <p className="text-sm text-gray-600 mb-3">Click to add features (appear as • separated)</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickDetails.map(detail => (
                    <button
                      type="button"
                      key={detail}
                      onClick={() => addQuickDetail(detail)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-700 rounded-full text-sm transition-all duration-200 hover:scale-105"
                    >
                      <span className="mr-1">+</span> {detail}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Features will appear here as • separated list"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-gray-50"
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-6">
                {/* Primary Image Upload */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                    <Star className="w-4 h-4" />
                    Primary Image (Cover Photo)
                  </label>
                  <p className="text-sm text-gray-600 mb-4">This will be the main image shown in listings</p>
                  
                  {imagePreviews.primary ? (
                    <div className="relative group">
                      <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${imagePreviews.primary})` }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removePrimaryImage}
                        className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                          Primary Image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all duration-300 bg-blue-50/50">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Upload Primary Image</p>
                        <p className="text-xs text-gray-500">Recommended: 1200x800px • Max 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePrimaryImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Secondary Images Upload */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                    <Upload className="w-4 h-4" />
                    Additional Images (Up to 7)
                  </label>
                  <p className="text-sm text-gray-600 mb-4">Show different angles and features of your property</p>
                  
                  {imagePreviews.secondary.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {imagePreviews.secondary.map((src, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                            <div 
                              className="w-full h-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${src})` }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg">
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                type="button"
                                onClick={() => setSecondaryAsPrimary(index)}
                                className="w-7 h-7 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600"
                                title="Set as primary"
                              >
                                <Star className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeSecondaryImage(index)}
                                className="w-7 h-7 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {imagePreviews.secondary.length < 7 && (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {imagePreviews.secondary.length === 0 
                            ? "Click to upload additional images" 
                            : `Add more images (${7 - imagePreviews.secondary.length} remaining)`}
                        </p>
                        <p className="text-xs text-gray-500">Upload up to 7 photos</p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleSecondaryImagesUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading || !primaryImage}
                  className="w-full bg-gradient-to-r from-gray-900 to-blue-900 text-white font-medium py-4 rounded-xl hover:shadow-lg transition-all duration-200 text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {(isSubmitting || isLoading) ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <div className="p-1.5 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-base">Publish Listing</span>
                      {!primaryImage && (
                        <span className="text-xs text-yellow-200 ml-2">(Primary image required)</span>
                      )}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Preview & Tips */}
        <div className="space-y-6">
          {/* Preview Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded"></div>
              Listing Preview
            </h3>
            
            <div className="space-y-4">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                {imagePreviews.primary ? (
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${imagePreviews.primary})` }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No primary image</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {formData.propertyType && (
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{formData.propertyType}</span>
                  </div>
                )}
                
                {formData.price && (
                  <div className="text-2xl font-bold text-gray-900">
                    ₺{formData.price} <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                )}
                
                {formData.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                    <span className="text-sm text-gray-700">{formData.address}</span>
                  </div>
                )}
                
                {formData.availableRooms && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    📍 {formData.availableRooms} room(s) available
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6 border border-blue-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-500 rounded"></div>
              Tips for Success
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-bold">1</span>
                </div>
                <span className="text-sm text-gray-700">Use high-quality, well-lit photos</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-bold">2</span>
                </div>
                <span className="text-sm text-gray-700">Be specific about room sharing details</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-bold">3</span>
                </div>
                <span className="text-sm text-gray-700">Include all utilities in the price</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-bold">4</span>
                </div>
                <span className="text-sm text-gray-700">Set realistic availability dates</span>
              </li>
            </ul>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Completion Progress</h3>
              <span className="text-sm font-medium text-blue-600">
                {calculateCompletion()}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${calculateCompletion()}%` }}
              ></div>
            </div>
            
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${imagePreviews.primary ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span>Primary image {imagePreviews.primary ? '✓' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${formData.propertyType ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span>Property type {formData.propertyType ? '✓' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${formData.price ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span>Price set {formData.price ? '✓' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${imagePreviews.secondary.length >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span>At least 3 photos {imagePreviews.secondary.length >= 3 ? '✓' : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Help Text */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          Your listing will be visible to EUL students within 24 hours. 
          Make sure all information is accurate and complete for better visibility.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Need help? Contact support: <span className="text-blue-600">support@eulhousing.com</span>
        </p>
      </div>
    </div>
  );
}

// Export types for use in other components
export type { CreateListingProps, ListingFormData };