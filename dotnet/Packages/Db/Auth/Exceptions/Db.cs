namespace Zed31rus.Packages.Db.Auth.Exceptions;

public class DbException(string message) : Exception(message);

public class DbExceptions
{
    public class UniqueViolationException(Exception inner) : Exception("UNIQUE_VIOLATION", inner);
}