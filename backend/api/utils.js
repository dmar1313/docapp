const csv = require('csv-parse');
const fs = require('fs');
const parseCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const parser = csv({ columns: true });
    const trips = [];

    parser.on('readable', () => {
      let row;
      while ((row = parser.read()) !== null) {
        trips.push({
          tripNumber: row['Trip Number'],
          resource: row['Resource'],
          name: row['Name'],
          pickupAddress: row['Pickup Address'],
          pickupAddress2: row['Pickup Address 2'],
          pickupCounty: row['Pickup County'],
          vehicleType: row['Vehicle Type'],
          specialNeeds: row['Special Needs'],
          destinationAddress: row['Destination Address'],
          destinationAddress2: row['Destination Address 2'],
          appointmentTime: row['Appointment Time'],
          pickupTime: row['Pickup Time'],
          mileage: row['Mileage'],
          providerNotes: row['Provider Notes'],
          pharmacyStop: row['Pharmacy Stop Auth'] === 'True',
          wheelchair: row['Wheelchair'] === 'True',
          highRisk: row['High Risk'] === 'True',
          confirmationNumber: row['Confirmation Number']
        });
      }
    });

    parser.on('end', () => {
      resolve(trips);
    });

    parser.on('error', (error) => {
      reject(error);
    });

    fs.createReadStream(filePath).pipe(parser);
  });
};
module.exports = parseCSV;