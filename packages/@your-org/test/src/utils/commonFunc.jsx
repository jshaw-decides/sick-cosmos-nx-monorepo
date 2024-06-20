import React from 'react';
import { SVG_ASSETS } from './assets';

export function getAddress(input) {
  if (input) {
    if (input?.input) {
      return `${input.address} ${input.city}, ${input.state} ${input.zipCode}`;
    } else {
      return `${input.addressLine1} ${input.city}, ${input.state} ${input.zipCode}`;
    }
  }
}

export function getPhoneNumber(phone) {
  if (phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  return null;
}

export function getFormattedDate(date) {
  const temp = new Date(date);
  return date
    ? {
        date: temp.toLocaleDateString('en-US', {
          year: '2-digit',
          month: 'numeric',
          day: 'numeric',
        }),
        time: temp.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
        }),
      }
    : null;
}

export function getInventoryTitle(item) {
  return `${item?.year} ${item?.make} ${item?.model} ${item?.modelNumber}`;
}

export function sumStats(stats) {
  if (stats) {
    return (
      stats?.pendingUnits +
      stats?.activeUnits +
      stats?.expiredUnits +
      stats?.unlistedUnits
    );
  } else return 0;
}

export function GetNumberFormatWithComma(value) {
  return Math.floor(value).toLocaleString('en-US').split('.')[0];
}

export function GetDollarFormat(value) {
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

  return formattedValue.split('.')[0]; // Remove values after decimal point
}

export function GetNumberFormat(value) {
  return Math.floor(value).toLocaleString('en-US'); // Remove values after decimal point
}

export const getNormalizeInput = (value, previousValue) => {
  if (!value) return value;
  let currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  if (cvLength === 1) {
    if (value === '0' || value === '1') {
      currentValue = value.replace(/[0-9]/g, '');
    }
  }

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }
};

export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return pattern.test(email);
};

export function getRemainingDays(listingDate) {
  const today = new Date();
  const diffTime = Math.abs(today - listingDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 7) {
    return 0;
  }

  return 7 - diffDays;
}

export const addCommas = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');

export const DropdownTrigger =
  (label, required = false, select = false) =>
  () => {
    return (
      <div
        className={`relative flex cursor-pointer items-center justify-between rounded-lg border bg-white px-3.5 py-2.5 sm:p-2.5 sm:text-sm ${
          select ? 'text-title' : 'text-label'
        }`}
      >
        <p
          className={`font-medium font-Archivo ${
            !label && 'h-6 w-4/5 animate-pulse bg-gray-200'
          }`}
        >
          {label}
          {required && <span className="text-red-500">&nbsp;*</span>}
        </p>
        <SVG_ASSETS.DropDownArror />
      </div>
    );
  };

export function getStates() {
  return [
    {
      name: 'Select State',
      abbreviation: '',
    },
    {
      name: 'Alabama',
      abbreviation: 'AL',
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
    },
    {
      name: 'American Samoa',
      abbreviation: 'AS',
    },
    {
      name: 'Arizona',
      abbreviation: 'AZ',
    },
    {
      name: 'Arkansas',
      abbreviation: 'AR',
    },
    {
      name: 'California',
      abbreviation: 'CA',
    },
    {
      name: 'Colorado',
      abbreviation: 'CO',
    },
    {
      name: 'Connecticut',
      abbreviation: 'CT',
    },
    {
      name: 'Delaware',
      abbreviation: 'DE',
    },
    {
      name: 'District Of Columbia',
      abbreviation: 'DC',
    },
    {
      name: 'Federated States Of Micronesia',
      abbreviation: 'FM',
    },
    {
      name: 'Florida',
      abbreviation: 'FL',
    },
    {
      name: 'Georgia',
      abbreviation: 'GA',
    },
    {
      name: 'Guam',
      abbreviation: 'GU',
    },
    {
      name: 'Hawaii',
      abbreviation: 'HI',
    },
    {
      name: 'Idaho',
      abbreviation: 'ID',
    },
    {
      name: 'Illinois',
      abbreviation: 'IL',
    },
    {
      name: 'Indiana',
      abbreviation: 'IN',
    },
    {
      name: 'Iowa',
      abbreviation: 'IA',
    },
    {
      name: 'Kansas',
      abbreviation: 'KS',
    },
    {
      name: 'Kentucky',
      abbreviation: 'KY',
    },
    {
      name: 'Louisiana',
      abbreviation: 'LA',
    },
    {
      name: 'Maine',
      abbreviation: 'ME',
    },
    {
      name: 'Marshall Islands',
      abbreviation: 'MH',
    },
    {
      name: 'Maryland',
      abbreviation: 'MD',
    },
    {
      name: 'Massachusetts',
      abbreviation: 'MA',
    },
    {
      name: 'Michigan',
      abbreviation: 'MI',
    },
    {
      name: 'Minnesota',
      abbreviation: 'MN',
    },
    {
      name: 'Mississippi',
      abbreviation: 'MS',
    },
    {
      name: 'Missouri',
      abbreviation: 'MO',
    },
    {
      name: 'Montana',
      abbreviation: 'MT',
    },
    {
      name: 'Nebraska',
      abbreviation: 'NE',
    },
    {
      name: 'Nevada',
      abbreviation: 'NV',
    },
    {
      name: 'New Hampshire',
      abbreviation: 'NH',
    },
    {
      name: 'New Jersey',
      abbreviation: 'NJ',
    },
    {
      name: 'New Mexico',
      abbreviation: 'NM',
    },
    {
      name: 'New York',
      abbreviation: 'NY',
    },
    {
      name: 'North Carolina',
      abbreviation: 'NC',
    },
    {
      name: 'North Dakota',
      abbreviation: 'ND',
    },
    {
      name: 'Northern Mariana Islands',
      abbreviation: 'MP',
    },
    {
      name: 'Ohio',
      abbreviation: 'OH',
    },
    {
      name: 'Oklahoma',
      abbreviation: 'OK',
    },
    {
      name: 'Oregon',
      abbreviation: 'OR',
    },
    {
      name: 'Palau',
      abbreviation: 'PW',
    },
    {
      name: 'Pennsylvania',
      abbreviation: 'PA',
    },
    {
      name: 'Puerto Rico',
      abbreviation: 'PR',
    },
    {
      name: 'Rhode Island',
      abbreviation: 'RI',
    },
    {
      name: 'South Carolina',
      abbreviation: 'SC',
    },
    {
      name: 'South Dakota',
      abbreviation: 'SD',
    },
    {
      name: 'Tennessee',
      abbreviation: 'TN',
    },
    {
      name: 'Texas',
      abbreviation: 'TX',
    },
    {
      name: 'Utah',
      abbreviation: 'UT',
    },
    {
      name: 'Vermont',
      abbreviation: 'VT',
    },
    {
      name: 'Virgin Islands',
      abbreviation: 'VI',
    },
    {
      name: 'Virginia',
      abbreviation: 'VA',
    },
    {
      name: 'Washington',
      abbreviation: 'WA',
    },
    {
      name: 'West Virginia',
      abbreviation: 'WV',
    },
    {
      name: 'Wisconsin',
      abbreviation: 'WI',
    },
    {
      name: 'Wyoming',
      abbreviation: 'WY',
    },
    {
      name: 'Alberta',
      abbreviation: 'AB',
    },
    {
      name: 'British Columbia',
      abbreviation: 'BC',
    },
    {
      name: 'Manitoba',
      abbreviation: 'MB',
    },
    {
      name: 'New Brunswick',
      abbreviation: 'NB',
    },
    {
      name: 'Newfoundland and Labrador',
      abbreviation: 'NL',
    },
    {
      name: 'Northwest Territories',
      abbreviation: 'NT',
    },
    {
      name: 'Nova Scotia',
      abbreviation: 'NS',
    },
    {
      name: 'Nunavut',
      abbreviation: 'NU',
    },
    {
      name: 'Ontario',
      abbreviation: 'ON',
    },
    {
      name: 'Prince Edward Island',
      abbreviation: 'PE',
    },
    {
      name: 'Quebec',
      abbreviation: 'QC',
    },
    {
      name: 'Saskatchewan',
      abbreviation: 'SK',
    },
    {
      name: 'Yukon Territory',
      abbreviation: 'YT',
    },
  ];
}

export const customDropdownTheme = {
  arrowIcon: 'ml-2 h-4 w-4',
  content: 'py-1 focus:outline-none max-h-60 overflow-y-auto',
  floating: {
    animation: 'transition-opacity',
    base: 'z-50 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none',
    content: 'py-1 text-sm text-gray-700',
    divider: 'my-1 h-px bg-gray-100',
    header: 'block py-2 px-4 text-sm text-gray-700',
    hidden: 'invisible opacity-0',
    item: {
      container: '',
      base: 'flex items-center justify-start gap-1 py-2 px-4 text-sm text-gray-700 cursor-pointer duration-500 w-full border-none outline-none hover:bg-gray-300 focus:bg-gray-100 focus:outline-none',
      icon: 'mr-2 h-4 w-4',
    },
    target: 'w-fit',
  },
  inlineWrapper: 'flex items-center',
};
