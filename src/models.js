export const ageRanges = [
  {
    symbol: 'A',
    label: 'Adult',
    lower: 21,
    upper: 54
  },
  {
    symbol: 'C',
    label: 'Cub',
    lower: 0,
    upper: 12
  },
  {
    symbol: 'J',
    label: 'Junior',
    lower: 13,
    upper: 16
  },
  {
    symbol: 'S',
    label: 'Senior',
    lower: 65,
    upper: 199
  },
  {
    symbol: 'V',
    label: 'Veteran',
    lower: 55,
    upper: 64
  },
  {
    symbol: 'YA',
    label: 'Young adult',
    lower: 17,
    upper: 20
  }
]

export const bowTypes = [
  {
    symbol: 'HB',
    text: 'Historical bow'
  },
  {
    symbol: 'LB',
    text: 'Long Bow'
  },
  {
    symbol: 'TR',
    text: 'Traditional Recurve'
  },
  {
    symbol: 'BH-R',
    text: 'Bowhunter Recurve'
  },
  {
    symbol: 'BB-R',
    text: 'Barebow Recurve'
  },
  {
    symbol: 'BB-C',
    text: 'Barebow Compound'
  },
  {
    symbol: 'BH-C',
    text: 'Bowhunter Compound'
  },
  {
    symbol: 'BU',
    text: 'Bowhunter Unlimited'
  },
  {
    symbol: 'BL',
    text: 'Bowhunter Limited'
  },
  {
    symbol: 'FS-C',
    text: 'Freestyle Compound',
    pro: true
  },
  {
    symbol: 'FS-R',
    text: 'Freestyle Recurve',
    pro: true
  },
  {
    symbol: 'FU',
    text: 'Freestyle Unlimited',
    pro: true
  }
]

export const roomTypes = [
  {
    building: 'Main building',
    rooms: [
      { name: 'Twin room - Standard', price: 450, code: 1 },
      { name: 'Room w/ 3 single beds - Standard', price: 610, code: 2 },
      { name: 'Twin room - Comfort', price: 550, code: 3 },
      { name: 'Room w/ 3 single beds - Comfort', price: 750, code: 4 },
      { name: 'Room w/ 2 bunk beds (4ppl.)', price: 740, code: 5 },
      { name: 'Room w/ 3 bunk beds (6ppl.)', price: 1000, code: 6 }
    ]
  },
  {
    building: 'Stadion house',
    rooms: [{ name: 'Twin room', price: 450, code: 7 }]
  },
  {
    building: 'Camp houses',
    rooms: [
      { name: 'House w/ twin room (2ppl.)', price: 450, code: 8 },
      { name: 'House w/ 4 single beds (4ppl.)', price: 700, code: 9 },
      { name: 'House w/ 2 bunk beds (4ppl.)', price: 700, code: 10 }
    ]
  }
]

export const countries = [
  {
    key: 'AFAA',
    label: 'Andorra'
  },
  {
    key: 'AATA',
    label: 'Argentina'
  },
  {
    key: 'ABA',
    label: 'Australia'
  },
  {
    key: 'OBSV',
    label: 'Austria'
  },
  {
    key: 'RBA',
    label: 'Belgium'
  },
  {
    key: 'AFB',
    label: 'Brazil'
  },
  {
    key: 'BFAA',
    label: 'Bulgaria'
  },
  {
    key: 'FCA',
    label: 'Canada'
  },
  {
    key: 'Arqueros de Chile',
    label: 'Chile'
  },
  {
    key: 'CZ3D',
    label: 'Czech Republic'
  },
  {
    key: 'EFAA',
    label: 'England'
  },
  {
    key: 'FAAE',
    label: 'Estonia'
  },
  {
    key: 'AAE',
    label: 'Europe'
  },
  {
    key: 'FFAA',
    label: 'Finland'
  },
  {
    key: 'FFTL',
    label: 'France'
  },
  {
    key: 'DFBV',
    label: 'Germany'
  },
  {
    key: 'HKFAA',
    label: 'Hong Kong'
  },
  {
    key: 'HAA',
    label: 'Hungary'
  },
  {
    key: 'IBA',
    label: 'Iceland'
  },
  {
    key: 'FAAI',
    label: 'India'
  },
  {
    key: 'IFAF',
    label: 'Ireland'
  },
  {
    key: 'FIARC',
    label: 'Italy'
  },
  {
    key: 'LAF',
    label: 'Latvia'
  },
  {
    key: 'FAAFL',
    label: 'Liechtenstein'
  },
  {
    key: 'LAA',
    label: 'Lithuania'
  },
  {
    key: 'FLTA',
    label: 'Luxembourg'
  },
  {
    key: 'FAAM',
    label: 'Mexico'
  },
  {
    key: 'AAN',
    label: 'Namibia'
  },
  {
    key: 'NHB',
    label: 'Netherlands'
  },
  {
    key: 'NZFAA',
    label: 'New Zealand'
  },
  {
    key: 'NIFAA',
    label: 'Northern Ireland'
  },
  {
    key: 'PFAA',
    label: 'Poland'
  },
  {
    key: 'FABP',
    label: 'Portugal'
  },
  {
    key: 'FRATF',
    label: 'Romania'
  },
  {
    key: 'FSTA',
    label: 'San Marino'
  },
  {
    key: 'SFAA',
    label: 'Scotland'
  },
  {
    key: 'SAA',
    label: 'Slovakia'
  },
  {
    key: 'SANAA',
    label: 'South Africa'
  },
  {
    key: 'AAL',
    label: 'Spain'
  },
  {
    key: 'SFSF',
    label: 'Sweden'
  },
  {
    key: 'FAAS',
    label: 'Switzerland'
  },
  {
    key: 'ZAA',
    label: 'Zambia'
  },
  {
    key: 'FUTARCO',
    label: 'Uruguay'
  },
  {
    key: 'NFAA',
    label: 'USA'
  },
  {
    key: 'WFAA',
    label: 'Wales'
  }
]

export const roomPricingModel = [
  { name: 'Twin room - Standard', price: 450, code: 1 }, // Code: TWIN-STANDARD
  { name: 'Room w/ 3 single beds - Standard', price: 610, code: 2 }, // Code: TRIPLE-SINGLE-STANDARD
  { name: 'Twin room - Comfort', price: 550, code: 3 }, // Code: TWIN-COMFORT
  { name: 'Room w/ 3 single beds - Comfort', price: 750, code: 4 }, // Code: TRIPLE-SINGLE-COMFORT
  { name: 'Room w/ 2 bunk beds (4ppl.)', price: 740, code: 5 }, // Code: DUAL-BUNK
  { name: 'Room w/ 3 bunk beds (6ppl.)', price: 1000, code: 6 }, // Code: TRIPLE-BUNK
  { name: 'Twin room', price: 450, code: 7 }, // Code: TWIN-STADION
  { name: 'House w/ twin room (2ppl.)', price: 400, code: 8 }, // Code: TWIN-HOUSE
  { name: 'House w/ 4 single beds (4ppl.)', price: 700, code: 9 }, // Code: SINGLE-BED-HOUSE
  { name: 'House w/ 2 bunk beds (4ppl.)', price: 700, code: 10 } // Code: BUNK-BED-HOUSE
]
