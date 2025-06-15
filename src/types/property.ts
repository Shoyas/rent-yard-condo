export interface PropertyAddress {
  propertyName: string;
  totalUnits: string;
  propertyWebsite: string;
  country: string;
  streetAddress: string;
  aptSuiteUnit: string;
  cityTown: string;
  stateTerritory: string;
  zipCode: string;
}

export interface LeasingInfo {
  manager: string;
  email: string;
  phone: string;
  sameAsProperty: boolean;
  leasingAddress?: {
    streetAddress: string;
    aptSuiteUnit: string;
    cityTown: string;
    stateTerritory: string;
    zipCode: string;
  };
}

export interface Charges {
  applicationFee: string;
  adminFee: string;
}

export interface RentFrequency {
  frequency: string;
  reminderDate: string;
  dueDate: string;
}

export interface PetFee {
  type: string;
  maxWeight: string;
  monthlyRent: string;
  oneTimeFee: string;
  securityDeposit: string;
}

export interface PropertyData {
  propertyAddress?: PropertyAddress;
  leasingInfo?: LeasingInfo;
  charges?: Charges;
  rentFrequency?: RentFrequency;
  petFees: PetFee[];
  parking?: string;
  educationalInstitutions: string[];
  stations: string[];
  landmarks: string[];
  applicationAgreement?: string;
  aboutProperty?: string;
  amenities: string[];
  utilities?: string;
}

export type ModalType =
  | 'propertyAddress'
  | 'leasingInfo'
  | 'charges'
  | 'rentFrequency'
  | 'petFees'
  | 'parking'
  | 'education'
  | 'stations'
  | 'landmarks'
  | 'application'
  | 'about'
  | 'amenities'
  | 'utilities';

export interface ModalField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'select'
    | 'textarea'
    | 'number'
    | 'checkboxInput';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  gridCols?: 1 | 2 | 3;
  defaultValue?: string;
}

export interface ModalConfig {
  title: string;
  fields: ModalField[];
  gridCols?: 1 | 2 | 3;
}

export const MODAL_CONFIGS: Record<ModalType, ModalConfig> = {
  propertyAddress: {
    title: 'Property address',
    fields: [
      {
        name: 'propertyName',
        label: 'Property name as identifier',
        type: 'text',
        placeholder: 'Dallas apartments complex',
        required: true,
        gridCols: 1
      },
      {
        name: 'totalUnits',
        label: 'Total apartment unit',
        type: 'number',
        placeholder: '50',
        required: true,
        gridCols: 1
      },
      {
        name: 'propertyWebsite',
        label: 'Property website(optional)',
        type: 'text',
        placeholder: 'https://',
        gridCols: 1
      },
      {
        name: 'country',
        label: 'Country/Region',
        type: 'select',
        required: true,
        placeholder: 'Select country',
        options: [
          { value: 'US', label: 'United States' },
          { value: 'BD', label: 'Bangladesh' },
          { value: 'CA', label: 'Canada' }
        ]
      },
      {
        name: 'streetAddress',
        label: 'Street address',
        type: 'text',
        placeholder: '111 Austin Ave',
        required: true
      },
      {
        name: 'aptSuiteUnit',
        label: 'Apt, suite, unit (if applicable)',
        type: 'text',
        placeholder: '123'
      },
      {
        name: 'cityTown',
        label: 'City/Town',
        type: 'text',
        placeholder: 'Dallas',
        required: true
      },
      {
        name: 'stateTerritory',
        label: 'State/Territory',
        type: 'select',
        placeholder: 'Choose state',
        required: true,
        options: [
          { value: 'Texas', label: 'Texas' },
          { value: 'California', label: 'California' },
          { value: 'New York', label: 'New York' }
        ]
      },
      {
        name: 'zipCode',
        label: 'Zip code',
        type: 'text',
        placeholder: '75061',
        required: true
      }
    ],
    gridCols: 3 // Set to 3 columns so first 3 fields display in a row
  },
  leasingInfo: {
    title: 'Leasing info',
    fields: [
      {
        name: 'manager',
        label: 'Leasing manager',
        type: 'text',
        placeholder: 'Alex Johan filex',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'leasing@rentyard.com',
        required: true
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
        placeholder: '+8601632177501',
        required: true
      },
      {
        name: 'sameAsProperty',
        label: 'Address(same as property)',
        type: 'checkboxInput',
        gridCols: 2
      },
      // ! Address fields (only shown when checkbox is unchecked)
      {
        name: 'leasingAddress.streetAddress',
        label: 'Street address',
        type: 'text',
        placeholder: '111 Austin Ave',
        required: true,
        gridCols: 2
      },
      {
        name: 'leasingAddress.aptSuiteUnit',
        label: 'Apt, suite, unit (if applicable)',
        type: 'text',
        placeholder: '123',
        gridCols: 2
      },
      {
        name: 'leasingAddress.cityTown',
        label: 'City/Town',
        type: 'text',
        placeholder: 'Dallas',
        required: true,
        gridCols: 1
      },
      {
        name: 'leasingAddress.stateTerritory',
        label: 'State/Territory',
        type: 'select',
        required: true,
        options: [
          { value: 'tx', label: 'Texas' },
          { value: 'ca', label: 'California' },
          { value: 'ny', label: 'New York' }
        ],
        gridCols: 1
      },
      {
        name: 'leasingAddress.zipCode',
        label: 'Zip code',
        type: 'text',
        placeholder: '75061',
        required: true,
        gridCols: 2
      }
    ],
    gridCols: 2
  },
  charges: {
    title: 'Charges',
    fields: [
      {
        name: 'applicationFee',
        label: 'Application fee*',
        type: 'number',
        placeholder: '$100',
        required: true
      },
      {
        name: 'adminFee',
        label: 'Admin fee*',
        type: 'number',
        placeholder: '$15',
        required: true
      }
    ],
    gridCols: 2
  },
  rentFrequency: {
    title: 'Rent frequency & payment reminder',
    fields: [
      {
        name: 'frequency',
        label: 'Rent payment frequency*',
        type: 'select',
        required: true,
        options: [
          { value: 'monthly', label: 'Monthly' },
          { value: 'weekly', label: 'Weekly' }
        ]
      },
      {
        name: 'reminderDate',
        label: 'Rent reminder date*',
        type: 'text',
        placeholder: '25th every month',
        required: true
      },
      {
        name: 'dueDate',
        label: 'Rent due date*',
        type: 'text',
        placeholder: '5th every month',
        required: true,
        gridCols: 2
      }
    ],
    gridCols: 2
  },
  petFees: {
    title: 'Pet fees',
    fields: [
      {
        name: 'type',
        label: 'Pet type*',
        type: 'text',
        placeholder: 'Dog',
        required: true
      },
      {
        name: 'maxWeight',
        label: 'Max weight*',
        type: 'text',
        placeholder: '20lb',
        required: true
      },
      {
        name: 'monthlyRent',
        label: 'Monthly per rent*',
        type: 'number',
        placeholder: '$100',
        required: true
      },
      {
        name: 'oneTimeFee',
        label: 'One time pet fee*',
        type: 'number',
        placeholder: '$100',
        required: true
      },
      {
        name: 'securityDeposit',
        label: 'Pet security deposit*',
        type: 'number',
        placeholder: '$100',
        required: true,
        gridCols: 2
      }
    ],
    gridCols: 2
  },
  parking: {
    title: 'Parking',
    fields: [
      {
        name: 'type',
        label: 'Parking type*',
        type: 'text',
        placeholder: 'Guest vehicle parking time: 2H',
        required: true,
        gridCols: 2
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Lorem ipsum dolor sit amet...',
        gridCols: 2
      }
    ],
    gridCols: 1
  },
  education: {
    title: 'Nearest educational institution',
    fields: [
      {
        name: 'name',
        label: 'Institution name*',
        type: 'text',
        placeholder: 'Elementary school, Institution name, 2mile',
        required: true,
        gridCols: 2
      }
    ],
    gridCols: 1
  },
  stations: {
    title: 'Nearest stations',
    fields: [
      {
        name: 'name',
        label: 'Station name*',
        type: 'text',
        placeholder: 'Bus, Stations name, 2mile',
        required: true,
        gridCols: 2
      }
    ],
    gridCols: 1
  },
  landmarks: {
    title: 'Nearest landmark',
    fields: [
      {
        name: 'name',
        label: 'Landmark name*',
        type: 'text',
        placeholder: 'Museums, Landmark name, 2mile',
        required: true,
        gridCols: 2
      }
    ],
    gridCols: 1
  },
  application: {
    title: 'Application agreement',
    fields: [
      {
        name: 'agreement',
        label: 'Agreement*',
        type: 'text',
        placeholder: 'PDF',
        required: true
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Accept immigrant & international student application',
        gridCols: 2
      }
    ],
    gridCols: 1
  },
  about: {
    title: 'About the property',
    fields: [
      {
        name: 'description',
        label: 'Property description',
        type: 'textarea',
        placeholder:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        gridCols: 2
      }
    ],
    gridCols: 1
  },
  amenities: {
    title: "Community's amenity/features",
    fields: [
      {
        name: 'amenities',
        label: 'Select amenities',
        type: 'text',
        placeholder: 'Air conditioning, Cable ready, Ceiling fan...',
        gridCols: 2
      }
    ],
    gridCols: 1
  },
  utilities: {
    title: 'Utilities provider',
    fields: [
      {
        name: 'provider',
        label: 'Utility provider*',
        type: 'text',
        placeholder: 'Provider name',
        required: true,
        gridCols: 2
      }
    ],
    gridCols: 1
  }
};
