CREATE TABLE Degrees (
  id VarChar(255) NOT NULL, 
  name VarChar(255) NOT NULL,
  details LongText,
  PRIMARY KEY (id)
);

CREATE TABLE Pathways (
  id VarChar(255) NOT NULL,
  degree VarChar(255) NOT NULL,
  name VarChar(255) NOT NULL,
  details LongText,
  PRIMARY KEY (id),
  FOREIGN KEY (degree) REFERENCES Degrees(id)
);

CREATE TABLE Users (
  id VarChar(255) NOT NULL ,
  name VarChar(255) NOT NULL,
  email VarChar(255) NOT NULL,
  password VarChar(255) NOT NULL,
  degree VarChar(255),
  interest VarChar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (degree) REFERENCES Degrees(id),
  FOREIGN KEY (interest) REFERENCES Pathways(id)
);

CREATE TABLE Courses (
  courseId VarChar(255) NOT NULL, 
  name VarChar(255) NOT NULL,
  details LONGTEXT,
  PRIMARY KEY (courseId)
);

CREATE TABLE CourseTerms (
  courseId VarChar(255) NOT NULL, 
  Term ENUM('1', '2', '3') NOT NULL,
  FOREIGN KEY (courseId) REFERENCES Courses(courseId)
);

CREATE TABLE PreReqs (
  courseId VarChar(255) NOT NULL, 
  preReq VarChar(255) NOT NULL,
  FOREIGN KEY (courseId) REFERENCES Courses(courseId),
  FOREIGN KEY (preReq) REFERENCES Courses(courseId)
);

CREATE TABLE Compulsory (
  pathway VarChar(255) NOT NULL, 
  courseId VarChar(255) NOT NULL, 
  FOREIGN KEY (pathway) REFERENCES Pathways(id),
  FOREIGN KEY (courseId) REFERENCES Courses(courseId)
);

CREATE TABLE Recommended (
  pathway VarChar(255) NOT NULL, 
  courseId VarChar(255) NOT NULL, 
  FOREIGN KEY (pathway) REFERENCES Pathways(id),
  FOREIGN KEY (courseId) REFERENCES Courses(courseId)
);

CREATE TABLE CompletedCourses (
  userId VarChar(255) NOT NULL, 
  course VarChar(255) NOT NULL,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (course) REFERENCES Courses(courseId)
);

CREATE TABLE Terms (
  id VarChar(255) NOT NULL,
  year integer NOT NULL,
  term integer NOT NULL,
  course VarChar(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (course) REFERENCES Courses(courseId)
);

CREATE TABLE Roadmaps (
  userId VarChar(255) NOT NULL,
  terms VarChar(255) NOT NULL, 
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (terms) REFERENCES Terms(id)
);

-- Degree and Pathways
INSERT INTO Degrees VALUES ('3778', 'Computer Science', 'Computer Science involves the study of the design, construction and uses of computer systems. It is concerned with the representation of data and data structures in computer systems and the design of algorithms for automatic manipulation of this information by programming languages and machine systems. It is very much concerned with the design and development of hardware and software tools by which computer applications may be developed, but not so much with the applications themselves. It is, however, noted that non-computing elements (such as human interface or psychological aspects) can often dictate the level of success of computing systems. At UNSW, particular emphasis is given to comprehension of the basic principles behind computing tools, operating systems, compilers and translators, and computer hardware.');
INSERT INTO Pathways VALUES ('compa1', '3778', 'Computer Science', 'Computers are now ubiquitous, and critical to the functioning of all enterprises in modern industrial societies, from commerce to health and education. They now also play an important social role, opening new avenues for people to connect and to engage in public discourse. The demand for computing professionals capable of managing existing computing infrastructure or, more importantly, creating the next generation of computing applications, will continue to grow into the future This stream provides a solid grounding in the fundamentals of the computing discipline (programs, algorithms, design, systems, software engineering) and then allows students to choose from a wide range of electives in later years. The flexibility of the stream allows students to take a broad range of courses, or to focus on one particular area of computing. This is the default plan for students in the 3778 BSc in Computer Science program or in dual degrees involving Computer Science.');
INSERT INTO Pathways VALUES ('compy1', '3778', 'Security Engineering', 'This offers a stream to undergraduate students intending to practice in Cyber Security in industry. This is a high demand area of employment and is forecast to have serious undersupply of graduates to at least 2025. The cyber security education design is based on the security approaches of Ross Anderson and Bruce Schneier and incorporates an explicit engineering focus to security, rather than the more usual ad hoc "hacker"?, or commercial "responsive"? approaches of cyber security education. The core courses in the stream teach analysis and systematic professional approaches to engineering security and examine failures, bugs, and human / system interactions and issues. There is an ongoing focus on security by design and professional ethical security practice. Specialist elective courses allow students to specialise in their areas of interest and skill. Graduates of the stream are equipped for careers in penetration testing, incident response, software assessment, malware analysis, forensics, military or law enforcement, security consulting, and security lead in dev teams. This stream relies on students being exposed to C and to secure coding and vulnerabilities in first year including: memory use (data representation, the heap, function calls and the stack), and some assembly.');

-- Compulsory Courses
INSERT INTO Courses VALUES ('comp1511', 'Programming Fundamentals', 'An introduction to problem-solving via programming, which aims to have students develop proficiency in using a high level programming language. Topics: algorithms, program structures (statements, sequence, selection, iteration, functions), data types (numeric, character), data structures (arrays, tuples, pointers, lists), storage structures (memory, addresses), introduction to analysis of algorithms, testing, code quality, teamwork, and reflective practice. The course includes extensive practical work in labs and programming projects.');
INSERT INTO CourseTerms VALUES ('comp1511', '1');
INSERT INTO CourseTerms VALUES ('comp1511', '2');
INSERT INTO CourseTerms VALUES ('comp1511', '3');
INSERT INTO Courses VALUES ('comp1521', 'Computer Systems Fundamentals', 'This course provides a programmer''s view on how a computer system executes programs, manipulates data and communicates. It enables students to become effective programmers in dealing with issues of performance, portability, and robustness. It is typically taken in the semester after completing COMP1511, but could be delayed and taken later. It serves as a foundation for later courses on networks, operating systems, computer architecture and compilers, where a deeper understanding of systems-level issues is required.');
INSERT INTO CourseTerms VALUES ('comp1521', '1');
INSERT INTO CourseTerms VALUES ('comp1521', '2');
INSERT INTO CourseTerms VALUES ('comp1521', '3');
INSERT INTO Courses VALUES ('comp1531', 'Software Engineering Fundamentals', 'This course provides an introduction to software engineering principles: basic software lifecycle concepts, modern development methodologies, conceptual modeling and how these activities relate to programming. It also introduces the basic notions of team-based project management via conducting a project to design, build and deploy a simple web-based application. It is typically taken in the semester after completing COMP1511, but could be delayed and taken later. It provides essential background for the teamwork and project management required in many later courses.');
INSERT INTO CourseTerms VALUES ('comp1531', '1');
INSERT INTO CourseTerms VALUES ('comp1531', '2');
INSERT INTO CourseTerms VALUES ('comp1531', '3');
INSERT INTO Courses VALUES ('comp2511', 'Name:Object-Oriented Design & Programming', 'COMP2511 builds on the foundation of first-year CSE courses, and begins to answer the questions: ''What does good software look like?'' and ''How do you build software that is flexible, reusable and maintainable''. The course introduces students to the Object-Oriented Programming paradigm and explores how OOP attempts to solve the problem of good software design. Students explore fundamental Design Patterns in designing, writing and testing software, and how to apply these strategies to both theoretical and real-world problems. The course also teaches an appreciation for elegantly written code, problem solving and finding well-designed solutions to problems that have longevity of software in mind.');
INSERT INTO CourseTerms VALUES ('comp2511', '1');
INSERT INTO CourseTerms VALUES ('comp2511', '2');
INSERT INTO CourseTerms VALUES ('comp2511', '3');
INSERT INTO Courses VALUES ('comp2521', 'Data Structures and Algorithms', 'The goal of this course is to deepen your understanding of data structures and algorithms and how these can be employed effectively in the design of software systems. It is an important course in covering a range of core data structures and algorithms that will be used in context in later courses. You explore these ideas in lectures, tutorials, lab exercises, quizzes and assignments. Assessment involves lab exercises, quizzes, assignments and a final exam involving both practice and theory. At the end of the course, we want you to be a solid programmer, with knowledge of a range of useful data structures and programming techniques, and ready to continue with further specialised studies in computing.');
INSERT INTO CourseTerms VALUES ('comp2521', '1');
INSERT INTO CourseTerms VALUES ('comp2521', '2');
INSERT INTO CourseTerms VALUES ('comp2521', '3');
INSERT INTO Courses VALUES ('comp3121', 'Algorithms and Programming Techniques', 'Correctness and efficiency of algorithms. Computational complexity: time and space bounds. Techniques for best-case, worst-case and average-case time and space analysis. Designing algorithms using induction, divide-and-conquer and greedy strategies. Algorithms: sorting and order statistics, trees, graphs, matrices. Intractability: classes P, NP, and NP-completeness, approximation algorithms.');
INSERT INTO CourseTerms VALUES ('comp3121', '1');
INSERT INTO Courses VALUES ('comp4920', 'Professional Issues and Ethics in Information Technology', 'In this course we will explore ethical issues for computer science, widely conceived. We will examine in detail the nature of ethical claims/moral judgements themselves, and how it is that our beliefs about their nature can affect our understanding of the ethical issues relating to computer science that we have examined so far. We will learn about ethical arguments, and how to construct and evaluate them.');
INSERT INTO CourseTerms VALUES ('comp4920', '1');
INSERT INTO CourseTerms VALUES ('comp4920', '3');
INSERT INTO Courses VALUES ('comp3900', 'Computer Science Project', 'Welcome to the Information Technology/Computer Science Project Course, where theory meets practice in a hands-on exploration of real-world projects. This course is designed to elevate your programming skills by immersing you in the intricacies of coding, debugging, and optimizing software solutions. As you apply your theoretical knowledge of information technology/computer science concepts, algorithms, and data structures, you will actively bridge the gap between theoretical understanding and practical implementation. This course places a strong emphasis on teamwork and effective collaboration. You will navigate the challenges of group projects, learning to work seamlessly with peers, share responsibilities, and communicate ideas effectively. Beyond coding and collaboration, the course offers a comprehensive exploration of project management skills. From planning and scheduling to task prioritization, you will gain insights into the entire project lifecycle, experiencing firsthand the evolution of a concept into a completed solution. Furthermore, you will learn the art of crafting clear and concise project reports, and the skills to deliver impactful presentations.');
INSERT INTO CourseTerms VALUES ('comp1521', '1');
INSERT INTO CourseTerms VALUES ('comp1521', '2');
INSERT INTO CourseTerms VALUES ('comp1521', '3');
INSERT INTO Courses VALUES ('math1131', 'Mathematics 1A', 'This course builds on high school calculus-based courses to provide a solid foundation for further study in mathematics for students in STEM disciplines. It is taken by undergraduate students typically in their first year and is usually followed by MATH1231 or MATH1241. The Calculus half of the course develops a deeper understanding of continuous and differentiable functions and introduces the Riemann integral. It shows how theorems such as the Maximum-Minimum Theorem, the Intermediate Value Theorem and Mean Value Theorems are used to justify properties of common functions and to solve both theoretical and applied problems. The Algebra half of the course introduces vectors and matrices and the solution of systems of linear equations by Gaussian elimination which paves the way for linear algebra in later courses. Technology is used throughout the course through use of the Maple computer algebra system and students producing a typeset assignment. Students are assumed to have a good understanding of NSW HSC Mathematics Extension 1 and 2 subjects.');
INSERT INTO CourseTerms VALUES ('comp1521', '1');
INSERT INTO CourseTerms VALUES ('comp1521', '2');
INSERT INTO CourseTerms VALUES ('comp1521', '3');
INSERT INTO Courses VALUES ('math1231', 'Mathematics 1B', 'This course builds on MATH1131 or MATH1141 to provide a solid foundation for further study in mathematics for students in STEM disciplines. It is taken by undergraduate students typically in their first year. The Calculus half of the course covers partial derivatives and multivariable chain rules, further techniques of integration and applications of integration, ordinary differential equations, sequences, series and Taylor series. The Linear Algebra half of the course introduces abstract linear algebra, covering vector spaces and linear transformations and eigenvalue and eigenvectors. In addition, there is a topic on probability distributions. Technology is used throughout the course through use of the Maple computer algebra system and students producing a typeset assignment that focuses on written communication skills.');
INSERT INTO CourseTerms VALUES ('comp1521', '1');
INSERT INTO CourseTerms VALUES ('comp1521', '2');
INSERT INTO CourseTerms VALUES ('comp1521', '3');
INSERT INTO Courses VALUES ('math1081', 'Discrete Math', 'This course will enhance students'' research, inquiry, and analytical thinking abilities and provide them with the mathematical language and mathematical techniques to unravel many seemingly unrelated problems. The course content addresses five major pillars of discrete mathematics: set theory, number theory, proofs and logic, combinatorics, and graph theory. The theory covered will provide a good foundation for understanding many problems that arise in all science disciplines, particularly higher mathematics and computer science.');
INSERT INTO CourseTerms VALUES ('comp1521', '1');
INSERT INTO CourseTerms VALUES ('comp1521', '2');
INSERT INTO CourseTerms VALUES ('comp1521', '3');

INSERT INTO PreReqs VALUES ('comp1521', 'comp1511');
INSERT INTO PreReqs VALUES ('comp1531', 'comp1511');
INSERT INTO PreReqs VALUES ('comp2511', 'comp1531');
INSERT INTO PreReqs VALUES ('comp2521', 'comp1511');
INSERT INTO PreReqs VALUES ('comp3121', 'comp1511');
INSERT INTO PreReqs VALUES ('comp3121', 'comp2521');
INSERT INTO PreReqs VALUES ('comp3900', 'comp1531');
INSERT INTO PreReqs VALUES ('comp3900', 'comp2521');
INSERT INTO PreReqs VALUES ('math1231', 'math1131');

-- Generally Recommended Courses
INSERT INTO Courses VALUES ('comp6080', 'Web Front End Programming', 'COMP6080 aims to develop your confidence in building modern web-based applications to industry standards. This occurs through the introduction of a range of basic concepts surrounding HTML, CSS, Vanilla Javascript, Javascript Declarative Frameworks, UI/UX Principles, Accessibility, Network & Asynchronous Programming, Front-end Testing, and other basic infrastructure. This course has a heavy emphasis on industry voices, and as such a number of lectures will be given by current front-end developers from industry. These lectures primarily come from employees at Canva, a Sydney-based technology company that does a lot of work with front-end technologies. COMP6080 is a challenging course. Front-end development is unlike most things you''ve experienced at university before. You will find the individual problems you solve much simpler than other level 6 courses, but the time you will feel that you spend on the aggregate of these issues will feel larger. A number of students will find this course quite time consuming if they''re hoping to achieve a high mark. We''d encourage you to reflect on this fact before you enrol in the course.');
INSERT INTO CourseTerms VALUES ('comp6080', '1');
INSERT INTO CourseTerms VALUES ('comp6080', '3');
INSERT INTO Courses VALUES ('comp3311', 'Database Systems', 'This course aims to explore in depth the practice of developing database applications and the theory behind relational database systems. It will also give a very brief overview of the technologies used in implementing database management systems and the past, present and future of database systems. Large data resources are critical to the functioning of just about every significant modern computer application. Hence, knowledge of how to manage them is clearly important to the IT industry. In the context of further study, COMP3311 also provides a foundation for further study in advanced database topics, such as COMP9312 Graph Data Analytics, and COMP9315 Database Systems Implementation. Database concepts are also relevant in courses such as COMP9319 Web Data Compression and Search and COMP6714 Information Retrieval and Web Search. By the end of this course, we want you to be capable of building high-quality (correct and efficient) applications based on relational databases, to have a sound understanding of issues in managing relational database management systems, and an overview of how they work internally.');
INSERT INTO CourseTerms VALUES ('comp3311', '1');
INSERT INTO CourseTerms VALUES ('comp3311', '2');
INSERT INTO Courses VALUES ('comp3142', 'Software Testing and Quality Assurance', 'Software plays an important role in our daily life. It is important to construct robust, operational software, especially under limited development budget and time constraints. To address this problem, a thorough verification and validation process is needed. In this course, you will study classic and modern techniques for the automated testing and analysis of software systems for reliability, security, and performance. Throughout the course, you will gain insight into a spectrum of software quality assurance techniques, including but not limited to fuzz testing and symbolic execution. These techniques will be not only studied but also applied in real-world scenarios, providing practical skills that are highly relevant in the ever-evolving landscape of software development.');
INSERT INTO CourseTerms VALUES ('comp3142', '2');
INSERT INTO Courses VALUES ('comp3331', 'Computer Networks and Applications', 'This course is an introductory course on computer networks aimed at students with a computer science / electrical engineering background. You will focus on common paradigms and protocols used in present data communication. Through lectures, in-class activities, labs and assignments, you will learn the theory and application of: (1) Medium access control, congestion control, flow control, and reliable transmission, (2) Addressing and naming, (3) Routing and switching, (4) Widely used protocols such as Ethernet, IP, TCP, UDP, HTTP, etc. (5) Special-purpose networks including content delivery, peer-to-peer, and wireless networks, and (6) Security threats and standard defensive techniques. This is a combined undergraduate and postgraduate course. The corresponding postgraduate course code is COMP9331.');
INSERT INTO CourseTerms VALUES ('comp3331', '1');
INSERT INTO CourseTerms VALUES ('comp3331', '2');
INSERT INTO CourseTerms VALUES ('comp3331', '3');
INSERT INTO Courses VALUES ('comp3511', 'Human Computer Interaction', 'The course covers topics related to User Interface Design and Visual Design Principles. These topics aim to equip you with the skills necessary to design websites, mobile apps, and various software packages. You will learn how to apply a User-Centered Design process, which involves data collection from users, Requirement Analysis, Design, Prototyping, and Usability Evaluation. This process ensures that the final product is tailored to meet users'' needs. Additionally, the course covers other relevant topics that help you understand your users and their needs. These topics include an overview of basic Cognitive Capacities, Designing for Accessibility, Internationalization, Levels of Expertise, and Collaboration. Lastly, the course introduces you to new emerging technologies, such as the metaverse, immersive technologies, and smart devices. These technologies require special design considerations and will be explored in the course. By the end of the course, you will have gained a comprehensive understanding of User Interface Design and Visual Design Principles, along with the ability to apply User-Centered Design methodologies and adapt products to meet users'' needs.');
INSERT INTO CourseTerms VALUES ('comp3511', '2');
INSERT INTO Courses VALUES ('comp6771', 'Advanced C++ Programming', 'COMP6771 is an advanced programming course teaching practical aspects of intermediate/advanced C++ programming. The course focuses on teaching the fundamentals of C++, followed by exploring powerful abstractions that C++ enables. This course focuses on using abstractions as well as building abstractions. COMP6771 is focused on modern, practical programming methods and tools. This course is designed for latter year CSE students with a reasonable degree of programming competencies. The course is heavily supported by Christopher Di Bella , a UNSW CSE graduate who is a well-regarded expert on C++. His knowledge and expertise assists in forming and updating the course. Our aim for students who complete this course satisfactorily is that they are highly competent in understanding C++ and it''s core features, being able to build complex programs, data structures, and algorithms with C++, and being ready to immediately move into the workforce in areas that rely heavily on C++. COMP6771 can be a challenging course for students due to the volume of work to complete in a 10 week period.');
INSERT INTO CourseTerms VALUES ('comp6771', '2');
INSERT INTO Courses VALUES ('comp2041', 'Software Construction: Techniques and Tools', 'This course is designed for students who have mastered the basics of programming. It aims to broaden your knowledge of techniques and tools for software construction. It covers: Unix filters, shell scripting and Python (for programming), git (for version control), docker (for portable deployment), package managers (for configuration and deployment). At the end of this course, you should be able to build moderate-sized software systems and configure them so that others can download and deploy your work.');
INSERT INTO CourseTerms VALUES ('comp2041', '1');
INSERT INTO CourseTerms VALUES ('comp2041', '2');
INSERT INTO Courses VALUES ('comp3231', 'Operating Systems', 'Operating systems are an essential part of computer systems, so a course on operating systems is an essential part of any computer science or computer engineering program. This course provides an in-depth understanding of the underlying operating systems that students have implicitly relied upon when developing applications in the foundational courses within Computer Science and Engineering. The knowledge gained will continue to be relevant to your future career when developing systems and applications. In general terms, the course aims to educate students in the basic concepts, components and behaviours of modern monolithic operating systems,  including the relevant characteristics of hardware. Topics include processes, threads, concurrency, file systems, memory management and scheduling. Students will apply some of the concepts learnt by implementing parts of a realistic teaching operating system.');
INSERT INTO CourseTerms VALUES ('comp3231', '2');
INSERT INTO Courses VALUES ('desn1000', 'Introduction to Engineering Design and Innovation', 'In this course, you will experience first-hand one of the major things that engineers do: designing and building creative solutions to problems. You will learn to think the way that engineers think, coming up with reasonable solutions to problems despite being limited by budget, time and resources, the requirement to also meet environmental and social objectives and, of course, the limitations of the laws of physics. This will help you appreciate engineering design''s central ideas as an on-time, on-budget and fit-for-purpose solution to a poorly specified, open-ended problem. You will start to build critical skills for engineers that will be called upon repeatedly in your academic and professional lives, including concept development, critical thinking and evaluation skills, clear communication, research and information literacy skills and the skills involved in successfully functioning within a team environment to complete a given task. A key part of the course is a design project. During the first week, you will select a project to complete from a list of possible options offered. Once you have joined a project, you will be assigned to a team of around 5-6 students during the second week. With this team, you will work to practically solve your design problem for the rest of the term.');
INSERT INTO CourseTerms VALUES ('desn1000', '2');

INSERT INTO PreReqs VALUES ('comp6080', 'comp1531');
INSERT INTO PreReqs VALUES ('comp6080', 'comp2521');
INSERT INTO PreReqs VALUES ('comp3311', 'comp2521');
INSERT INTO PreReqs VALUES ('comp3331', 'comp2521');
INSERT INTO PreReqs VALUES ('comp3142', 'comp1531');
INSERT INTO PreReqs VALUES ('comp3142', 'comp2511');
INSERT INTO PreReqs VALUES ('comp3142', 'comp2521');
INSERT INTO PreReqs VALUES ('comp2041', 'comp1511');
INSERT INTO PreReqs VALUES ('comp3231', 'comp1521');
INSERT INTO PreReqs VALUES ('comp3231', 'comp2521');
INSERT INTO PreReqs VALUES ('comp3231', 'comp2521');


-- Security C0urses 
INSERT INTO Courses VALUES ('comp6841', 'Extended Security Engineering and Cyber Security', 'In this introductory cybersecurity course we look at Security Engineering – the engineering principles behind designing, monitoring, and maintaining security in the face of an adversary.  We explore selected case studies and examine the practical principles behind effective security. We introduce the fundamental ideas of security and then we look at how these are applied in current cyber security practice. We will pay particular attention to systems which fail and the importance of thinking like an attacker. This course involves analysis, critical thinking and design. A cunning and devious mind will be an asset. Although our main concern is cybersecurity, the engineering principles we cover apply to security more generally.');
INSERT INTO CourseTerms VALUES ('comp6841', '2');
INSERT INTO Courses VALUES ('comp4337', 'Securing Fixed and Wireless Networks', 'With the exponential growth of the Internet, the security of a network has become increasingly challenging. This subject will explore the security vulnerabilities in both fixed and wireless networks and cover the fundamental concepts and advanced issues with an emphasis on Internet architecture and protocols.');
INSERT INTO CourseTerms VALUES ('comp4337', '1');
INSERT INTO Courses VALUES ('comp6843', 'Extended Web Application Security and Testing', 'Web applications are currently the predominant source of software vulnerabilities exploited in in online attacks. There is a growing need and growing demand for web programmers to be security aware. This course covers the main types of web application vulnerabilities and current best practice professional coding and testing practices to be able to successfully develop secure web applications.');
INSERT INTO CourseTerms VALUES ('comp6843', '1');
INSERT INTO Courses VALUES ('comp6845', 'Extended Digital Forensics and Incident Response', 'Description: The subject of Digital Forensics is a blend of technical expertise, legal procedures for an expert witness, persuasive report writing and your performance in the theatre of court. This course covers both forensic theory / professional practice, and looking at the underlying engineering of hiding, finding, interpreting and responding to traces. Students will use of standard forensic tools to extract, carve and analyse data as well as learning the low-level technical skills and knowledge underlying them. Students will also be introduced to advanced topics such as Cloud Forensics and latest anti-forensics techniques.');
INSERT INTO CourseTerms VALUES ('comp6845', '2');
INSERT INTO CourseTerms VALUES ('comp6845', '3');
INSERT INTO Courses VALUES ('comp6447', 'System and Software Security Assessment', 'This course looks at cyber attack and defence. Students learn how to assess and identify vulnerabilities and how vulnerabilities are exploited. Students learn the principles and theory of exploitation, the common security models, and how approaches to exploitation and defence have evolved over time. Students from this course will engage in wargames, analyse real world case studies of vulnerabilities in complex software used on widespread systems, and gain an understanding of the technical process of finding and fixing low-level software vulnerabilities and also of the economics and causal factors involved with their real world use.');
INSERT INTO CourseTerms VALUES ('comp6447', '3');
INSERT INTO Courses VALUES ('comp6448', 'Security Engineering Masterclass', 'This is an occasional course that will involve a visiting expert in the security area giving a series of lectures and workshops on an advanced topic in cyber security. The course may run in intensive mode or in standard in-person weekly or fortnightly mode. The precise timing and topics depend on the visitor.');
INSERT INTO CourseTerms VALUES ('comp6448', '1');
INSERT INTO CourseTerms VALUES ('comp6448', '2');
INSERT INTO CourseTerms VALUES ('comp6448', '3');
INSERT INTO Courses VALUES ('comp9447', 'Security Engineering Workshop', 'Applied workshop in an emerging area in cyber security.   The course is supervised and taught by relevant academics and/or industry experts in the field.  Areas vary depending on the availability of subject domain experts from time to time.  Examples of relevant areas include: Cloud Security, Cryptanalysis on commercial products, mainframe security audit and penetration testing.');
INSERT INTO CourseTerms VALUES ('comp9447', '1');
INSERT INTO CourseTerms VALUES ('comp9447', '3');
INSERT INTO Courses VALUES ('math3411', 'nformation, Codes and Ciphers', 'This course provides an introduction to information theory, including error-correcting codes, data compression and cryptography. Each of these subtopics are enhanced by the application of entropy functions, and more sophisticated error-correcting codes are provided by way of brief introduction to number theory and finite fields. The lectures are held face-to-face with simultaneous interactive online streaming. There is a weekly tutorial with multiple time slots to choose from, including online tutorials and face-to-face tutorials. The course emphases understanding, not just skill learning, and on helping each other to learn, understand and enjoy the content and the course.');
INSERT INTO CourseTerms VALUES ('math3411', '3');
INSERT INTO PreReqs VALUES ('comp6841', 'comp2521');
INSERT INTO PreReqs VALUES ('comp4337', 'comp3331');
INSERT INTO PreReqs VALUES ('comp6843', 'comp6841');
INSERT INTO PreReqs VALUES ('comp6845', 'comp6841');
INSERT INTO PreReqs VALUES ('comp6447', 'comp6841');
INSERT INTO PreReqs VALUES ('comp6448', 'comp6841');
INSERT INTO PreReqs VALUES ('comp9447', 'comp6841');
INSERT INTO PreReqs VALUES ('math3411', 'math1081');

-- Compulsory
INSERT INTO Compulsory VALUES ('compa1', 'comp1511');
INSERT INTO Compulsory VALUES ('compy1', 'comp1511');
INSERT INTO Compulsory VALUES ('compa1', 'comp1521');
INSERT INTO Compulsory VALUES ('compy1', 'comp1521');
INSERT INTO Compulsory VALUES ('compa1', 'comp1531');
INSERT INTO Compulsory VALUES ('compy1', 'comp1531');
INSERT INTO Compulsory VALUES ('compa1', 'comp2511');
INSERT INTO Compulsory VALUES ('compy1', 'comp2511');
INSERT INTO Compulsory VALUES ('compa1', 'comp2521');
INSERT INTO Compulsory VALUES ('compy1', 'comp2521');
INSERT INTO Compulsory VALUES ('compa1', 'comp3121');
INSERT INTO Compulsory VALUES ('compy1', 'comp3121');
INSERT INTO Compulsory VALUES ('compa1', 'comp3900');
INSERT INTO Compulsory VALUES ('compy1', 'comp3900');
INSERT INTO Compulsory VALUES ('compa1', 'comp4920');
INSERT INTO Compulsory VALUES ('compy1', 'comp4920');
INSERT INTO Compulsory VALUES ('compa1', 'math1081');
INSERT INTO Compulsory VALUES ('compy1', 'math1081');
INSERT INTO Compulsory VALUES ('compa1', 'math1131');
INSERT INTO Compulsory VALUES ('compy1', 'math1131');
INSERT INTO Compulsory VALUES ('compa1', 'math1231');
INSERT INTO Compulsory VALUES ('compy1', 'math1231');
INSERT INTO Compulsory VALUES ('compy1', 'comp6841');

-- Recommended
INSERT INTO Recommended VALUES ('compa1', 'comp3311');
INSERT INTO Recommended VALUES ('compa1', 'comp3142');
INSERT INTO Recommended VALUES ('compa1', 'comp3331');
INSERT INTO Recommended VALUES ('compa1', 'comp3511');
INSERT INTO Recommended VALUES ('compa1', 'comp6771');
INSERT INTO Recommended VALUES ('compa1', 'comp2041');
INSERT INTO Recommended VALUES ('compa1', 'comp3231');
INSERT INTO Recommended VALUES ('compa1', 'comp6841');
INSERT INTO Recommended VALUES ('compa1', 'comp6843');
INSERT INTO Recommended VALUES ('compa1', 'desn1000');

INSERT INTO Recommended VALUES ('compy1', 'comp3331');
INSERT INTO Recommended VALUES ('compy1', 'comp3231');
INSERT INTO Recommended VALUES ('compy1', 'comp4337');
INSERT INTO Recommended VALUES ('compy1', 'comp6843');
INSERT INTO Recommended VALUES ('compy1', 'comp6845');
INSERT INTO Recommended VALUES ('compy1', 'comp6447');
INSERT INTO Recommended VALUES ('compy1', 'comp6448');
INSERT INTO Recommended VALUES ('compy1', 'comp9447');
INSERT INTO Recommended VALUES ('compy1', 'math3411');