import { mockRequest, mockResponse } from "../../__mocks__";
import { getUsers } from "../../handlers/user";

describe("getUsers", () => {
  it("it should return array of users", () => {
    getUsers(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalledWith([]);
  });
});
