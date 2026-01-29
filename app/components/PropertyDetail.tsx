"use client";
import React, { useState } from 'react';
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Wifi, 
  Car, 
  Utensils, 
  Droplets, 
  Zap, 
  Shield, 
  Star, 
  Share2, 
  Heart, 
  Phone, 
  MessageCircle, 
  Mail,
  Home,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
  const properties = [
  {
    id: 1,
    propertyType: 'Studio (1+0)',
    price: '₺8,500',
    description: 'Fully furnished studio with kitchenette',
    address: 'Lefke Center, 5 mins to EUL',
    details: 'Water & electricity included • WiFi • 24/7 Security',
    imageUrl: '/pr1.jpg'
  },
  {
    id: 2,
    propertyType: '1+1 Apartment',
    price: '₺11,000',
    description: 'Modern apartment with balcony',
    address: 'Near EUL Main Gate',
    details: 'All bills included • Furnished • Parking available',
    imageUrl: '/pr2.jpg'
  },
  {
    id: 3,
    propertyType: '2+1 Apartment',
    price: '₺15,000',
    description: 'Spacious for sharing, 2 bedrooms',
    address: 'Güzelyurt Road, 7 mins to EUL',
    details: 'Utilities included • Furnished • Shared laundry',
    imageUrl: '/pr3.jpg'
  },
  {
    id: 4,
    propertyType: 'Studio (1+0)',
    price: '₺7,800',
    description: 'Newly renovated studio apartment',
    address: 'Student Zone, Lefke',
    details: 'Water & electricity included • Basic furniture • Garden view',
    imageUrl: '/pr4.jpg'
  },
  {
    id: 5,
    propertyType: '3+1 Apartment',
    price: '₺18,500',
    description: 'Perfect for 3-4 students',
    address: 'Lefke University District',
    details: 'All utilities included • Fully furnished • Balcony',
    imageUrl: '/pr3.jpg'
  },
  {
    id: 6,
    propertyType: '1+1 Apartment',
    price: '₺10,500',
    description: 'Cozy apartment with study area',
    address: '5 mins walk to EUL Campus',
    details: 'Bills included • Semi-furnished • Quiet neighborhood',
    imageUrl: '/pr4.jpg'
  },
  {
    id: 7,
    propertyType: '2+1 Apartment',
    price: '₺14,200',
    description: 'Recently renovated, modern interior',
    address: 'Near EUL Sports Complex',
    details: 'Water & electricity included • WiFi • Security deposit: 1 month',
    imageUrl: '/pr1.jpg'
  },
  {
    id: 8,
    propertyType: 'Studio (1+0)',
    price: '₺8,900',
    description: 'Compact studio with AC',
    address: 'Lefke City Center',
    details: 'All bills included • Furnished • Close to supermarkets',
    imageUrl: '/pr2.jpg'
  },
];
const PropertyDetail = ({ property = properties[0] }) => {
  // Simulate having multiple images for the property
  const propertyImages = [
    property.imageUrl,
    '/pr2.jpg', // Additional images
    '/pr3.jpg',
    '/pr4.jpg',
    '/pr1.jpg' // Could be different angles
  ];

  const [mainImage, setMainImage] = useState(propertyImages[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Extract numeric price for calculations
  const numericPrice = parseInt(property.price.replace('₺', '').replace(',', ''));

  return (
    <div className="property-detail max-w-6xl mx-auto p-4 md:p-6">
      {/* Header with title and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.propertyType}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <MapPin size={18} className="mr-2" />
            <span>{property.address}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="text-3xl font-bold text-blue-600">{property.price}
            <span className="text-sm font-normal text-gray-500">/month</span>
          </div>
          <div className="flex space-x-2">
            <button 
              className="p-2 border rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={20} 
                className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"} 
              />
            </button>
            <button className="p-2 border rounded-full hover:bg-gray-100 transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        {/* Main Image */}
        <div className="lg:col-span-3">
          <div className="relative rounded-xl overflow-hidden h-80 md:h-96">
            <img 
              src={mainImage} 
              alt={property.propertyType}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            <button 
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={20} 
                className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"} 
              />
            </button>
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {propertyImages.map((image, index) => (
            <button
              key={index}
              className={`relative rounded-lg overflow-hidden h-24 transition-all ${
                mainImage === image ? 'ring-2 ring-blue-500 scale-105' : 'hover:ring-1 hover:ring-gray-300'
              }`}
              onClick={() => setMainImage(image)}
            >
              <img 
                src={image} 
                alt={`Property view ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {mainImage === image && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2">
          {/* Property Features */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Property Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Bed className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bedrooms</p>
                  <p className="font-semibold">
                    {property.propertyType.includes('Studio') ? '1' : 
                     property.propertyType.includes('1+1') ? '1' : 
                     property.propertyType.includes('2+1') ? '2' : '3'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Bath className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bathrooms</p>
                  <p className="font-semibold">
                    {property.propertyType.includes('Studio') ? '1' : 
                     property.propertyType.includes('1+1') ? '1' : '1+'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Square className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-semibold">
                    {property.propertyType.includes('Studio') ? '35 m²' : 
                     property.propertyType.includes('1+1') ? '55 m²' : 
                     property.propertyType.includes('2+1') ? '75 m²' : '100 m²'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Utensils className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kitchen</p>
                  <p className="font-semibold">
                    {property.description.includes('kitchenette') ? 'Kitchenette' : 'Full Kitchen'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{property.description}</p>
            
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Included in the price:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.details.split('•').map((item, index) => (
                  item.trim() && (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{item.trim()}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Wifi size={20} className="text-blue-500" />
                <span>WiFi</span>
              </div>
              <div className="flex items-center space-x-3">
                <Droplets size={20} className="text-blue-500" />
                <span>Water Included</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap size={20} className="text-yellow-500" />
                <span>Electricity</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield size={20} className="text-gray-700" />
                <span>24/7 Security</span>
              </div>
              <div className="flex items-center space-x-3">
                <Car size={20} className="text-purple-500" />
                <span>Parking Available</span>
              </div>
              {property.description.includes('furnished') && (
                <div className="flex items-center space-x-3">
                  <Home size={20} className="text-amber-600" />
                  <span>Furnished</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Contact & Price Details */}
        <div className="space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Contact for Viewing</h3>
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2">
                <Phone size={20} />
                <span>Call Now</span>
              </button>
              <button className="w-full border border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-200 flex items-center justify-center space-x-2">
                <MessageCircle size={20} />
                <span>WhatsApp Message</span>
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition duration-200 flex items-center justify-center space-x-2">
                <Mail size={20} />
                <span>Email Inquiry</span>
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-700 mb-3">Price Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent</span>
                  <span className="font-semibold">{property.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deposit</span>
                  <span className="font-semibold">₺{numericPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Utilities</span>
                  <span className="text-green-600 font-semibold flex items-center">
                    <CheckCircle size={16} className="mr-1" />
                    Included
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Monthly</span>
                    <span>{property.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map/Location */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Location</h3>
            <div className="bg-gray-100 h-48 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-red-500 mx-auto mb-2" size={32} />
                <p className="text-gray-700 font-medium">{property.address}</p>
                <p className="text-sm text-gray-500 mt-1">5 mins to EUL Campus</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <Clock size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Walking distance to university</span>
              </div>
              <div className="flex items-start space-x-2">
                <Utensils size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Close to supermarkets and restaurants</span>
              </div>
              <div className="flex items-start space-x-2">
                <Shield size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Quiet neighborhood</span>
              </div>
              <div className="flex items-start space-x-2">
                <Car size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Easy access to public transportation</span>
              </div>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-3">Quick Facts</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Home size={18} className="text-gray-600" />
                  <span className="text-gray-600">Property Type</span>
                </div>
                <span className="font-semibold">{property.propertyType}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-gray-600" />
                  <span className="text-gray-600">Availability</span>
                </div>
                <span className="font-semibold text-green-600">Available Now</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-gray-600" />
                  <span className="text-gray-600">Minimum Stay</span>
                </div>
                <span className="font-semibold">6 months</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Users size={18} className="text-gray-600" />
                  <span className="text-gray-600">Students Preferred</span>
                </div>
                <span className="font-semibold text-green-600">Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start">
          <AlertCircle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" size={24} />
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Important Notes</h4>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>First month's rent + deposit required upon signing</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Contract minimum 6 months</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Students must provide university enrollment proof</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>No pets allowed</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Viewing available by appointment only</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;