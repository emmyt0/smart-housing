"use client";

import { useState } from "react";
import { Trash2, Bed, Bath, Square, MapPin, Calendar, DollarSign, Star, Home, CheckCircle, MoreVertical } from "lucide-react";
import Image from "next/image";

type Property = {
  id: string;
  title: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  price: number;
  currency: string;
  priceType: "sale" | "rent";
  location: string;
  dateListed: string;
  status: "published" | "pending" | "draft";
  featured: boolean;
  image: string;
};

type PropertyListingProps = {
  properties?: Property[];
  onDelete?: (propertyId: string) => void;
  showActions?: boolean;
};

// Sample property data with different images
const sampleProperties: Property[] = [
  {
    id: "1",
    title: "Villa in Coral Gables",
    type: "Villa",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 3500,
    areaUnit: "Sq Ft",
    price: 825000,
    currency: "$",
    priceType: "sale",
    location: "Coral Gables, Miami",
    dateListed: "June 14, 2017",
    status: "published",
    featured: true,
    image: "/pr1.jpg"
  },
  {
    id: "2",
    title: "Modern Downtown Apartment",
    type: "2+1 Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    areaUnit: "Sq Ft",
    price: 2500,
    currency: "$",
    priceType: "rent",
    location: "Downtown, NYC",
    dateListed: "March 22, 2024",
    status: "published",
    featured: false,
    image: "/pr2.jpg"
  },
  {
    id: "3",
    title: "Suburban Family House",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    areaUnit: "Sq Ft",
    price: 550000,
    currency: "$",
    priceType: "sale",
    location: "Green Valley, CA",
    dateListed: "January 15, 2024",
    status: "pending",
    featured: true,
    image: "/pr3.jpg"
  },
  {
    id: "4",
    title: "Studio Near University",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    areaUnit: "Sq Ft",
    price: 850,
    currency: "$",
    priceType: "rent",
    location: "University District",
    dateListed: "February 10, 2024",
    status: "published",
    featured: false,
    image: "/pr1.jpg"
  },
  {
    id: "5",
    title: "Luxury Beachfront Villa",
    type: "Premium Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    areaUnit: "Sq Ft",
    price: 1250000,
    currency: "$",
    priceType: "sale",
    location: "Malibu Beach, CA",
    dateListed: "May 30, 2024",
    status: "published",
    featured: true,
    image: "/pr2.jpg"
  },
  {
    id: "6",
    title: "City Center Penthouse",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    areaUnit: "Sq Ft",
    price: 3800,
    currency: "$",
    priceType: "rent",
    location: "Manhattan, NYC",
    dateListed: "April 15, 2024",
    status: "published",
    featured: false,
    image: "/pr3.jpg"
  }
];

export default function PropertyListing({ 
  properties = sampleProperties, 
  onDelete, 
  showActions = true 
}: PropertyListingProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (propertyId: string) => {
    setDeletingId(propertyId);
    
    // Simulate API call delay
    setTimeout(() => {
      if (onDelete) {
        onDelete(propertyId);
      }
      setDeletingId(null);
    }, 800);
  };

  const getStatusColor = (status: Property["status"]) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800 border border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "draft": return "bg-gray-100 text-gray-800 border border-gray-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  const getPriceDisplay = (property: Property) => {
    if (property.priceType === "rent") {
      return `${property.currency}${property.price.toLocaleString()}/month`;
    }
    return `${property.currency}${property.price.toLocaleString()}`;
  };

  // Function to get a fallback color based on property ID for image placeholder
  const getImagePlaceholderColor = (id: string) => {
    const colors = [
      "from-blue-100 to-blue-200",
      "from-green-100 to-green-200", 
      "from-amber-100 to-amber-200",
      "from-purple-100 to-purple-200",
      "from-red-100 to-red-200",
      "from-indigo-100 to-indigo-200"
    ];
    const index = parseInt(id) % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Listings</h1>
        <p className="text-gray-600">Manage your listed properties</p>
      </div>

      {/* Property List */}
      <div className="space-y-4">
        {properties.map((property) => (
          <div 
            key={property.id}
            className="border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                {/* Left Side - Property Info with Image */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-4">
                    {/* Property Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${getImagePlaceholderColor(property.id)}`} />
                      
                      {/* Image Display - You can use Next.js Image component when you have real images */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* This is a placeholder - replace with actual Image component */}
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 opacity-30">
                            {property.image === "/pr1.jpg" ? "PR1" : 
                             property.image === "/pr2.jpg" ? "PR2" : "PR3"}
                          </div>
                          <div className="text-xs text-gray-600 opacity-50 mt-1">
                            {property.type}
                          </div>
                        </div>
                        
                        {/* Featured badge on image */}
                        {property.featured && (
                          <div className="absolute top-1 left-1">
                            <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                              <Star className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Property Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {property.title}
                        </h3>
                        {property.featured && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-medium rounded border border-amber-200 flex-shrink-0">
                            <Star className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                      </div>
                      
                      {/* Property Type and Location */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="font-medium bg-gray-100 px-2 py-1 rounded">
                          {property.type}
                        </span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="truncate">{property.location}</span>
                        </div>
                      </div>
                      
                      {/* Property Stats */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <Bed className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700 font-medium">{property.bedrooms}</span>
                          <span className="text-xs text-gray-500">Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <Bath className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700 font-medium">{property.bathrooms}</span>
                          <span className="text-xs text-gray-500">Baths</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <Square className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700 font-medium">{property.area.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">{property.areaUnit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Price and Actions */}
                <div className="flex flex-col items-end gap-3 ml-4 min-w-[180px]">
                  {/* Price */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">
                      {getPriceDisplay(property)}
                    </div>
                    <div className={`text-sm ${property.priceType === "sale" ? "text-green-700" : "text-blue-700"} font-medium`}>
                      {property.priceType === "sale" ? "For Sale" : "For Rent"}
                    </div>
                  </div>
                  
                  {/* Status and Date */}
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{property.dateListed}</span>
                    </div>
                  </div>
                  
                  {/* Delete Button */}
                  {showActions && (
                    <button
                      onClick={() => handleDelete(property.id)}
                      disabled={deletingId === property.id}
                      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-w-[100px] ${
                        deletingId === property.id
                          ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                          : "bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                      }`}
                    >
                      {deletingId === property.id ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {properties.length === 0 && (
        <div className="text-center py-12 border border-gray-200 rounded-lg">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Home className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Listed</h3>
          <p className="text-gray-600 mb-6">
            You haven't listed any properties yet.
          </p>
          <button className="px-5 py-2.5 bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-lg font-medium hover:shadow-lg transition-all text-sm">
            + Add New Property
          </button>
        </div>
      )}

      {/* Summary Stats */}
      {properties.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing <span className="font-semibold text-gray-900">{properties.length}</span> properties
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Published: {properties.filter(p => p.status === "published").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>Pending: {properties.filter(p => p.status === "pending").length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span>Featured: {properties.filter(p => p.featured).length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export types for use in other components
export type { Property, PropertyListingProps };