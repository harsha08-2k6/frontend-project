// Demo data for the educational platform

// Teacher demo account
export const teacherAccount = {
  id: "teacher1",
  email: "teacher@example.com",
  password: "teacher123",
  name: "Goggineni Krishna Chaitanya",
  role: "teacher"
};

// Admin demo account
export const adminAccount = {
  id: "admin1",
  email: "admin@example.com",
  password: "admin123",
  name: "Admin",
  role: "admin"
};

// Student demo accounts
export const studentAccounts = [
  {
    id: "student1",
    email: "student1@example.com",
    password: "student123",
    name: "Shiva Ram",
    role: "student"
  },
  {
    id: "student2",
    email: "student2@example.com",
    password: "student123",
    name: "Mobeen",
    role: "student"
  },
  {
    id: "student3",
    email: "student3@example.com",
    password: "student123",
    name: "Harsha Sai",
    role: "student"
  },
  {
    id: "student4",
    email: "student4@example.com",
    password: "student123",
    name: "Aravind",
    role: "student"
  },
  {
    id: "student5",
    email: "student5@example.com",
    password: "student123",
    name: "Kalyan",
    role: "student"
  },
  {
    id: "student6",
    email: "student6@example.com",
    password: "student123",
    name: "Vardhan",
    role: "student"
  },
  {
    id: "student7",
    email: "student7@example.com",
    password: "student123",
    name: "Satish",
    role: "student"
  }
];

// Course data
export const courses = [
  {
    id: "course1",
    title: "Introduction to Programming",
    description: "Learn the basics of programming with Python",
    progress: {
      student1: 75,
      student2: 60,
      student3: 85,
      student4: 45,
      student5: 90,
      student6: 30,
      student7: 65
    },
    topics: [
      "Variables and Data Types",
      "Control Structures",
      "Functions",
      "Lists and Dictionaries",
      "File I/O"
    ]
  },
  {
    id: "course2",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript",
    progress: {
      student1: 85,
      student2: 70,
      student3: 55,
      student4: 90,
      student5: 40,
      student6: 75,
      student7: 60
    },
    topics: [
      "HTML Basics",
      "CSS Styling",
      "JavaScript Fundamentals",
      "DOM Manipulation",
      "Responsive Design"
    ]
  },
  {
    id: "course3",
    title: "Data Structures and Algorithms",
    description: "Learn essential computer science concepts",
    progress: {
      student1: 50,
      student2: 65,
      student3: 80,
      student4: 35,
      student5: 70,
      student6: 55,
      student7: 90
    },
    topics: [
      "Arrays and Linked Lists",
      "Stacks and Queues",
      "Trees and Graphs",
      "Sorting Algorithms",
      "Search Algorithms"
    ]
  },
  {
    id: "course4",
    title: "Database Management",
    description: "Learn SQL and database design",
    progress: {
      student1: 60,
      student2: 80,
      student3: 45,
      student4: 75,
      student5: 55,
      student6: 90,
      student7: 40
    },
    topics: [
      "Database Design",
      "SQL Basics",
      "Joins and Relationships",
      "Indexing and Optimization",
      "Transactions"
    ]
  }
];

// Assignment data
export const assignments = [
  {
    id: "assignment1",
    title: "Python Basics Exercise",
    description: "Create a simple calculator program using Python",
    courseId: "course1",
    dueDate: "2023-12-15",
    submissions: {
      student1: { submitted: true, file: "calculator_alex.pdf", grade: 85 },
      student2: { submitted: true, file: "calculator_jamie.pdf", grade: 78 },
      student3: { submitted: true, file: "calculator_taylor.pdf", grade: 92 },
      student4: { submitted: false },
      student5: { submitted: true, file: "calculator_casey.pdf", grade: 88 },
      student6: { submitted: false },
      student7: { submitted: true, file: "calculator_morgan.pdf", grade: 75 }
    }
  },
  {
    id: "assignment2",
    title: "HTML/CSS Portfolio",
    description: "Create a personal portfolio website using HTML and CSS",
    courseId: "course2",
    dueDate: "2023-12-20",
    submissions: {
      student1: { submitted: true, file: "portfolio_alex.pdf", grade: 90 },
      student2: { submitted: true, file: "portfolio_jamie.pdf", grade: 82 },
      student3: { submitted: false },
      student4: { submitted: true, file: "portfolio_jordan.pdf", grade: 95 },
      student5: { submitted: false },
      student6: { submitted: true, file: "portfolio_riley.pdf", grade: 88 },
      student7: { submitted: true, file: "portfolio_morgan.pdf", grade: 79 }
    }
  }
];

// Quiz data
export const quizzes = [
  {
    id: "quiz1",
    title: "Python Fundamentals",
    courseId: "course1",
    questions: [
      {
        id: "q1",
        question: "What is the correct way to declare a variable in Python?",
        options: [
          "var x = 5;",
          "x = 5",
          "int x = 5;",
          "let x = 5;"
        ],
        correctAnswer: "x = 5",
        topic: "Variables and Data Types"
      },
      {
        id: "q2",
        question: "Which of the following is a mutable data type in Python?",
        options: [
          "String",
          "Tuple",
          "List",
          "Integer"
        ],
        correctAnswer: "List",
        topic: "Variables and Data Types"
      }
    ]
  },
  {
    id: "quiz2",
    title: "HTML Basics",
    courseId: "course2",
    questions: [
      {
        id: "q1",
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
          "<link>",
          "<a>",
          "<href>",
          "<url>"
        ],
        correctAnswer: "<a>",
        topic: "HTML Basics"
      },
      {
        id: "q2",
        question: "Which attribute is used to specify the URL in an anchor tag?",
        options: [
          "link",
          "src",
          "href",
          "url"
        ],
        correctAnswer: "href",
        topic: "HTML Basics"
      }
    ]
  }
];

// Student quiz results
export const quizResults = {
  student1: [
    { quizId: "quiz1", score: 80, mistakes: ["q2"] },
    { quizId: "quiz2", score: 100, mistakes: [] }
  ],
  student2: [
    { quizId: "quiz1", score: 100, mistakes: [] },
    { quizId: "quiz2", score: 50, mistakes: ["q1", "q2"] }
  ],
  student3: [
    { quizId: "quiz1", score: 50, mistakes: ["q1", "q2"] },
    { quizId: "quiz2", score: 100, mistakes: [] }
  ],
  student4: [
    { quizId: "quiz1", score: 50, mistakes: ["q1", "q2"] },
    { quizId: "quiz2", score: 50, mistakes: ["q1", "q2"] }
  ],
  student5: [
    { quizId: "quiz1", score: 100, mistakes: [] },
    { quizId: "quiz2", score: 100, mistakes: [] }
  ],
  student6: [
    { quizId: "quiz1", score: 0, mistakes: ["q1", "q2"] },
    { quizId: "quiz2", score: 50, mistakes: ["q1"] }
  ],
  student7: [
    { quizId: "quiz1", score: 50, mistakes: ["q1"] },
    { quizId: "quiz2", score: 50, mistakes: ["q2"] }
  ]
};

// Topic resources for quiz mistakes
export const topicResources = {
  "Variables and Data Types": {
    videoUrl: "https://www.youtube.com/watch?v=khKv-8q7YmY",
    text: "Variables are containers for storing data values. In Python, you don't need to declare a variable type, and you can change the value later.",
    code: "# Example of Python variables\nx = 5           # integer\ny = 3.14        # float\nname = 'Python'  # string\nis_fun = True    # boolean"
  },
  "HTML Basics": {
    videoUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE",
    text: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements.",
    code: "<!-- Basic HTML structure -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Page Title</title>\n</head>\n<body>\n  <h1>My First Heading</h1>\n  <p>My first paragraph.</p>\n  <a href=\"https://example.com\">This is a link</a>\n</body>\n</html>"
  }
};