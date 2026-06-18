business = User.find_or_initialize_by(email: "business@pawfect.com")
if business.new_record?
  business.assign_attributes(
    name: "Pawfect Grooming",
    role: "business",
    password: "grooming123"
  )
  business.save!
  puts "Business account created: #{business.email} / grooming123"
else
  puts "Business account already exists"
end

services = [
  { name: "Bath & Brush", description: "Full bath, blow-dry, and brush-out.", duration: 60, price: 45.00 },
  { name: "Full Groom", description: "Bath, blow-dry, haircut, nail trim, ear clean.", duration: 90, price: 75.00 },
  { name: "Nail Trim", description: "Nail trim and file only.", duration: 15, price: 15.00 },
  { name: "Puppy's First Groom", description: "Gentle introduction groom for puppies under 6 months.", duration: 45, price: 40.00 }
]

services.each do |attrs|
  Service.find_or_create_by(name: attrs[:name]) do |s|
    s.assign_attributes(attrs)
  end
  puts "Service: #{attrs[:name]}"
end
