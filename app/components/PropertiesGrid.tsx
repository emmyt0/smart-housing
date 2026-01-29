import PropertyCard from "./PropertyCard";
const PropertiesGrid = () => {
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

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Minimal Header */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Available Properties
          </h2>
          <p className="text-gray-600 text-sm">
            {properties.length} properties in Austin, TX
          </p>
        </div>

        {/* Compact Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              propertyType={property.propertyType}
              price={property.price}
              description={property.description}
              address={property.address}
              details={property.details}
              imageUrl={property.imageUrl}
            />
          ))}
        </div>

        {/* Simple Pagination/View More */}
        <div className="flex justify-center mt-10">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              ← Previous
            </button>
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  num === 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesGrid;