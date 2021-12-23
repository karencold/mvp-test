export const state = {
  // hardcoded user
  user: {
    userId: "rahej",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com"
  }
}
export const getters = {
  getUserFullName: state => {
    return state.user.firstName + ' ' + state.user.lastName
  },
}