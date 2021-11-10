const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Student API",
      version: "1.0.0",
      description: "Student Information",
      defination: "CRUD operation",
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./src/index.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @function get
 * @name get
 * @path {GET} /
 * @code {200} if the code is successful
 * @code {400} if the code is throwing some error
 * @body {callback}
 * @returns NaN
 * @description
 *          This function takes no parameter and then returns the string to a server.So when a user is logging to
 *          that specific URL the server will send back instruction message with status of 200.
 * @example
 *      app.get('/', (req,res) => {
 *           res.send('Welcome to Home Page of API');
 *      });
 * @summary
 *        By Running the code the URL will give you an
 *        output of "Welcome to Home Page of API"
 */

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Home Page of API");
});

//Student data
let Student = [
  {
    id: 1,
    name: "Yash",
    department: "ComputerScience",
  },
  {
    id: 2,
    name: "Lakshay",
    department: "ComputerScience",
  },
  {
    id: 3,
    name: "Bharti",
    department: "FashionTechnology",
  },
  { id: 4, name: "Vaibhav", department: "BSC" },
];

/**
 * swagger: "2.0"
 * info:
 * title: Student API
 * description: Student details
 * version: 1.0
 * servers:
 *   -url: http://localhost:3000
 * schemes: [https,http]
 * apis: ["*.js"]
 */

/**
 * @swagger
 * tags:
 *  name: Students
 *  description: Student management API
 */

/**
 * @swagger
 * /Student:
 *  get:
 *      description: Used to get Student data
 *      tags: [Students]
 *      responses:
 *          '200':
 *              description: A successful response
 */

/**
 * @function get
 * @name get
 * @path {GET} /Student
 * @code {200} if the code is succesfull
 * @code {400} if the code has errors
 * @description
 *          This function takes a parameter employee and then returns the array to a server.So when a user is logging to
 *          that specific URL the server will send back instruction message with status of 200.
 * @example
 *      app.get('/Student', (req,res) => {
 *  res.status(200).send(Student);
 * });
 * @summary
 *        By Running the code  the URL will give you an
 *        output the Student details
 */

app.get("/Student", (req, res) => {
  res.status(200).send(Student);
});

/**
 * @swagger
 * /Student/{id}:
 *  get:
 *      summary: Used to get Student data
 *      tags: [Students]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: Student id
 *      responses:
 *          '200':
 *              description: A successful response
 *          '400':
 *              description: Student not found
 */

/**
 * @function get
 * @name get
 * @path {GET} /Student/:id
 * @code {200} if the code is succesfull
 * @code {400} if the code has errors
 * @description
 *          This function takes a parameter by employee id and then returns the employee details with specific id to a server.So when a user is logging to
 *          that specific URL the server will send back instruction message with status of 200.
 * @example
 *      app.get('/Student/:id', (req,res) => {
 *            const data = Student.find(student => student.id === parseInt(req.params.id));
 *            res.status(200).send(data);
 * });
 * @summary
 *        By Running the code the URL will give you an
 *        output the Student details
 */
app.get("/Student/:id", (req, res) => {
  const data = Student.find(
    (student) => student.id === parseInt(req.params.id)
  );
  if (!data) {
    return res.send("Student not found");
  }
  res.status(200).send(data);
});

/**
 * @swagger
 * /Student    :
 *  post:
 *     summary: Add a new Student
 *     consumes:
 *       - application/json
 *     tags: [Student]
 *     parameters:
 *       - in: body
 *         name: id
 *         description: Create a new Student
 *         schema:
 *          type: object
 *          required:
 *              - id
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                 type: string
 *              department:
 *                  type: string
 *     responses:
 *       201:
 *         description: created
 */

/**
 * @function post
 * @name post
 * @path {POST} /Student/
 * @code {201} if created succesfully
 * @code {400} if the code has errors
 * @description
 *          This function takes a parameter by Student and then creates a new Student details with specific to a server.So when a user is logging to
 *          that specific URL the server will send back instruction message with status of 200.
 * @example
 *      app.post('/Student/', (req,res) => {
 *            const data = {
 *      id: req.body.id,
 *       name: req.body.name,
 *       department: req.body.department
 *   };
 *   Student.push(data);
 *   res.status(200).send(data);
 * });
 * @summary
 *        By Running the code the URL will give you an
 *        output the Student details
 */

app.post("/Student", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res.send("Name cannot be less than 3 characters");
  }

  if (Student.find((student) => student.id === req.body.id)) {
    return res.send("id can not be duplicate");
  }
  const data = {
    id: req.body.id,
    name: req.body.name,
    department: req.body.department,
  };
  Student.push(data);
  res.status(200).send(data);
});

/**
 * @swagger
 * /Student:
 *  put:
 *     summary: Updates the Student details
 *     consumes:
 *       - application/json
 *     tags: [Student]
 *     parameters:
 *       - in: body
 *         name: id
 *         description: Student data will Update
 *         schema:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                 type: string
 *              department:
 *                  type: string
 *     responses:
 *       201:
 *         description: created
 */

/**
 * @function put
 * @name put
 * @path {PUT} /Student/
 * @code {200} if the data is created
 * @code {400} if the code has errors
 * @description
 *          This function takes a parameter by Student and then updates the data of existing Student details with specific to a server.So when a user is logging to
 *          that specific URL the server will send back instruction message with status of 200.
 * @example
 *     app.put("/Student/:id", (req, res) => {
 *       let id = req.params.id;
 *        let name = req.body.name;
 *        let department = req.body.department;
 *
 *        let index = Student.findIndex((student) => {
 *           return student.id == Number.parseInt(id);
 *         });
 *
 *         if (index >= 0) {
 *           let std = Student[index];
 *           std.name = name;
 *           std.department = department;
 *           res.status(200).json(std);
 *         } else {
 *           res.send("not found");
 *         }
 *        });
 * @summary
 *        By Running the code the URL will give you an
 *        output the Student details
 */

app.put("/Student/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let department = req.body.department;

  let index = Student.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });

  if (index >= 0) {
    let std = Student[index];
    std.name = name;
    std.department = department;
    res.status(200).json(std);
  } else {
    res.send("not found");
  }
});

/**
 * @swagger
 * /Student:
 *  patch:
 *     summary: Update the Student details
 *     consumes:
 *       - application/json
 *     tags: [Student]
 *     parameters:
 *       - in: body
 *         name: id
 *         description: Student data will update
 *         schema:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                 type: string
 *              department:
 *                  type: string
 *     responses:
 *       201:
 *         description: created
 */

/**
 * @function patch
 * @name patch
 * @path {PATCH} /Student/
 * @code {200} if the data is created
 * @code {400} if the code has errors
 * @description
 *          This function takes a parameter by Student and then updates the data of existing Student details with specific to a server.So when a user is logging to
 *          that specific URL the server will send back instruction message with status of 200.
 * @example
 *      app.patch("/Student/:id", (req, res) => {
 *           let id = req.params.id;
 *
 *           let index = Student.findIndex((student) => {
 *             return student.id == Number.parseInt(id);
 *           });
 *
 *            if (index >= 0) {
 *              let std = Student[index];
 *              if (req.body.name) {
 *                std.name = req.body.name;
 *              }
 *              if (req.body.department) {
 *                std.department = req.body.department;
 *              }
 *
 *              res.status(200).json(std);
 *            } else {
 *              res.send("not found");
 *            }
 *           });
 * @summary
 *        By Running the code the URL will give you an
 *        output the Student details
 */

app.patch("/Student/:id", (req, res) => {
  let id = req.params.id;

  let index = Student.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });

  if (index >= 0) {
    let std = Student[index];
    if (req.body.name) {
      std.name = req.body.name;
    }
    if (req.body.department) {
      std.department = req.body.department;
    }

    res.status(200).json(std);
  } else {
    res.send("not found");
  }
});

/**
 * @swagger
 * /Student/{id}:
 *  delete:
 *      summary: Used to delete Student data by id
 *      tags: [Student]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: Student id
 *      responses:
 *          '200':
 *              description: A successful response
 */

/**
 * @function delete
 * @name delete
 * @path {DELETE} /Student/:id
 * @code {200} if the code is succesfull
 * @code {400} if the code has errors
 * @description
 *          This function takes a parameter Student id and then delete the Student details with specific id to a server.So when a user is logging to
 *          that specific URL the server will send back instruction message with status of 200.
 * @example
 *      app.delete('/Student/:id', (req,res) => {
 *        const data = Student.find(student => student.id === parseInt(req.params.id));
 *        const index = Student.indexOf(data);
 *        Student.splice(index,1);
 *        res.status(200).send(data);
 *    });
 * @summary
 *        By Running the code the URL will give you an
 *        output the employee details
 */

app.delete("/Student/:id", (req, res) => {
  const data = Student.find(
    (student) => student.id === parseInt(req.params.id)
  );
  if (!data) {
    res.send("Student not found");
    return;
  }
  const index = Student.indexOf(data);
  Student.splice(index, 1);
  res.status(200).send(data);
});

// app.listen(3000, function () {
//   console.log("Server started on port 3000");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port $(PORT)");
});

module.exports = app;
