// Study notes, grouped by subject. The PDFs live in public/notes/.
export interface Unit {
  label: string;
  file: string;
}

export interface Subject {
  title: string;
  slug: string;
  description: string;
  units: Unit[];
}

export const NOTES: Subject[] = [
  {
    "title": "Management Information System",
    "slug": "management-information-system",
    "description": "Download unit-wise PDF notes for Management Information System (MIS), units 1 to 7.",
    "units": [
      {
        "label": "Unit 1",
        "file": "/notes/management_information_system/MIS-unit-1.pdf"
      },
      {
        "label": "Unit 2",
        "file": "/notes/management_information_system/MIS-unit-2.pdf"
      },
      {
        "label": "Unit 3",
        "file": "/notes/management_information_system/MIS-unit-3.pdf"
      },
      {
        "label": "Unit 4",
        "file": "/notes/management_information_system/MIS-unit-4.pdf"
      },
      {
        "label": "Unit 5",
        "file": "/notes/management_information_system/MIS-unit-5.pdf"
      },
      {
        "label": "Unit 6",
        "file": "/notes/management_information_system/MIS-unit-6.pdf"
      },
      {
        "label": "Unit 7",
        "file": "/notes/management_information_system/MIS-unit-7.pdf"
      }
    ]
  },
  {
    "title": "Cyber Security & Professional Ethics",
    "slug": "cybersecurity",
    "description": "Download unit-wise PDF notes for Cyber Security & Professional Ethics, units 1 to 8.",
    "units": [
      {
        "label": "Unit 1",
        "file": "/notes/cybersecurity/cybersecurity-unit-1.pdf"
      },
      {
        "label": "Unit 2",
        "file": "/notes/cybersecurity/cybersecurity-unit-2-revised.pdf"
      },
      {
        "label": "Unit 3",
        "file": "/notes/cybersecurity/Cybersecurity-Unit-3.pdf"
      },
      {
        "label": "Unit 4",
        "file": "/notes/cybersecurity/Cybersecurity-unit-4.pdf"
      },
      {
        "label": "Unit 5",
        "file": "/notes/cybersecurity/Cybersecurity-unit-5.pdf"
      },
      {
        "label": "Unit 6",
        "file": "/notes/cybersecurity/Cybersecurity-unit-6.pdf"
      },
      {
        "label": "Unit 7",
        "file": "/notes/cybersecurity/Cybersecurity-unit-7.pdf"
      },
      {
        "label": "Unit 8",
        "file": "/notes/cybersecurity/cybersecurity-unit-8.pdf"
      }
    ]
  },
  {
    "title": "Web Technology",
    "slug": "web-technology",
    "description": "Download unit-wise PDF notes for Web Technology, units 1 to 7.",
    "units": [
      {
        "label": "Unit 1",
        "file": "/notes/web-technology/web-tech-unit-1.pdf"
      },
      {
        "label": "Unit 2 Part 1",
        "file": "/notes/web-technology/web-tech-unit-2-part-1.pdf"
      },
      {
        "label": "Unit 2 Part 2",
        "file": "/notes/web-technology/web-tech-unit-2-part-2.pdf"
      },
      {
        "label": "Unit 3",
        "file": "/notes/web-technology/web-tech-unit-3.pdf"
      },
      {
        "label": "Unit 4",
        "file": "/notes/web-technology/web-tech-unit-4.pdf"
      },
      {
        "label": "Unit 5",
        "file": "/notes/web-technology/web-tech-unit-5.pdf"
      },
      {
        "label": "Unit 6",
        "file": "/notes/web-technology/web-tech-unit-6.pdf"
      },
      {
        "label": "Unit 7",
        "file": "/notes/web-technology/web-tech-unit-7.pdf"
      }
    ]
  },
  {
    "title": "C Programming",
    "slug": "c-programming",
    "description": "Download unit-wise PDF notes for C programming, units 1 to 9, including I/O operations.",
    "units": [
      {
        "label": "Unit 1",
        "file": "/notes/c-programming/c-programming-unit-1.pdf"
      },
      {
        "label": "Unit 2 Part 1",
        "file": "/notes/c-programming/c-programming-unit-2.pdf"
      },
      {
        "label": "Unit 2 Part 2",
        "file": "/notes/c-programming/c-unit-2-IO-operation.pdf"
      },
      {
        "label": "Unit 3",
        "file": "/notes/c-programming/c-programming-unit-3.pdf"
      },
      {
        "label": "Unit 4",
        "file": "/notes/c-programming/c-programming-unit_4.pdf"
      },
      {
        "label": "Unit 5",
        "file": "/notes/c-programming/c-programming-unit-5.pdf"
      },
      {
        "label": "Unit 6",
        "file": "/notes/c-programming/c-programming-unit-6.pdf"
      },
      {
        "label": "Unit 7",
        "file": "/notes/c-programming/c-programming-unit-7.pdf"
      },
      {
        "label": "Unit 8",
        "file": "/notes/c-programming/c-programming-unit-8.pdf"
      },
      {
        "label": "Unit 9",
        "file": "/notes/c-programming/c-programming-unit-9.pdf"
      }
    ]
  }
];
