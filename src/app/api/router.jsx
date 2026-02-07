export const feedback = [
  {
    id: 1,
    message: "Good service",
  },
  {
    id: 2,
    message: "Bad😓 service",
  },
  {
    id: 3,
    message: "jossssssss",
  },
];

export async function GET(request) {
  return Response.json({
    status: 200,
    message: "Hi",
  });
}