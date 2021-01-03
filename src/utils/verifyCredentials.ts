import User from "../models/User";
import AppError from "./AppError";

interface IRequest {
  checkedUsername: User | undefined;
  checkedEmail: User | undefined;
  checkedCPF: User | undefined;
}

export function VerifyCredentials({
  checkedUsername,
  checkedEmail,
  checkedCPF,
}: IRequest) {
  if (checkedUsername && checkedEmail && checkedCPF)
    throw new AppError("(Username, Email and CPF) is already in use");

  if (checkedUsername && !checkedEmail && !checkedCPF)
    throw new AppError("Username is already in use");

  if (!checkedUsername && checkedEmail && !checkedCPF)
    throw new AppError("Email is already in use");

  if (!checkedUsername && !checkedEmail && checkedCPF)
    throw new AppError("CPF is already in use");

  if (!checkedUsername && checkedEmail && checkedCPF)
    throw new AppError("(Email and CPF) is already in use");

  if (checkedUsername && !checkedEmail && checkedCPF)
    throw new AppError("(Username and CPF) is already in use");

  if (checkedUsername && checkedEmail && !checkedCPF)
    throw new AppError("(Username and Email) is already in use");
}
