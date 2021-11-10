// const { request } = require("../src/index.js");
const { expect } = require("@jest/globals");
const app = require("../src/index.js");
const request = require("axios");

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

describe("get /", () => {
  test("Fetch Student data", async () => {
    const response = await request.get(`http://localhost:3000/`);
    expect(response.status).toEqual(200);
  });
});

describe("get /Student", () => {
  test("Fetch Student data", async () => {
    const response = await request.get(`http://localhost:3000/Student`);
    expect(response.status).toEqual(200);
  });
});

describe("get /Student/id", () => {
  test("Fetch Student data ", async () => {
    const response = await request.get(`http://localhost:3000/Student/4`);
    expect(response.data).toMatchObject({
      id: 4,
      name: "Vaibhav",
      department: "BSC",
    });
  });

  test("should throw error if requested id is not an Student id", async () => {
    const response = await request.get("http://localhost:3000/Student/5");
    expect(response.data).toBe("Student not found");
  });
});

describe("post /Student/", () => {
  test("Fetch Student data having id 2", async () => {
    const response = await request.post("http://localhost:3000/Student", {
      id: 2,
      name: "Lakshay",
      department: "ComputerScience",
    });
    expect(response.status).toEqual(200);
  });

  test("should throw error if requested id is not an employee id", async () => {
    const response = await request.post("http://localhost:3000/Student", {
      id: 1,
      name: "at",
      designation: "ComputerScience",
    });
    expect(response.data).toBe("Name cannot be less than 3 characters");
  });

  test("Throw error if Requested id is not an Student id", async () => {
    const response = await request.post("http://localhost:3000/Student", {
      id: 1,
      name: "Jai",
      department: "Civil",
    });
    expect(response.data).toBe("id can not be duplicate");
  });
});

describe("Tests for PUT Request", () => {
  test("Update specific Student data by id.", async () => {
    let data = { name: "a", department: "h" };
    const response = await request.put(`http://localhost:3000/Student/1`, data);
    expect(response.data).toEqual({
      id: 1,
      name: "a",
      department: "h",
    });
  });

  test("id does not exist", async () => {
    let data = { name: "a", department: "h" };
    const response = await request.put(
      `http://localhost:3000/Student/15`,
      data
    );
    expect(response.data).toBe("not found");
  });

  test("id does not exist", async () => {
    let data = { name: "a", department: "h" };
    const response = await request.put(
      `http://localhost:3000/Student/55`,
      data
    );
    expect(response.data).toBe("not found");
  });
});

describe("Tests for Patch Request", () => {
  test("Update specific student data by id.", async () => {
    let data = { name: "Darpan" };
    const response = await request.patch(
      `http://localhost:3000/Student/2`,
      data
    );
    expect(response.data).toEqual({
      id: 2,
      name: "Darpan",
      department: "ComputerScience",
    });
  });

  test("id does not exist", async () => {
    let data = { name: "Aarti" };
    const response = await request.patch(
      `http://localhost:3000/Student/889`,
      data
    );
    expect(response.data).toBe("not found");
  });

  test("id does not exist", async () => {
    let data = { name: "Aarti" };
    const response = await request.patch(
      `http://localhost:3000/Student/865`,
      data
    );
    expect(response.data).toBe("not found");
  });
});

describe("delete /Student/:id", () => {
  test("Delete student data having id 2", async () => {
    const response = await request.delete("http://localhost:3000/Student/4");
    expect(response.data).toMatchObject({
      id: 4,
      name: "Vaibhav",
      department: "BSC",
    });
  });

  test("should throw error if requested id is not an employee id", async () => {
    const response = await request.delete("http://localhost:3000/Student/6");
    expect(response.data).toBe("Student not found");
  });
});
