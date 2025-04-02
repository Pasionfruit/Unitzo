import sqlite3
import os

def init_database():
    # Create a new SQLite database
    conn = sqlite3.connect('providers.db')
    cursor = conn.cursor()

    # Read and execute the SQL file
    with open('database.sql', 'r') as sql_file:
        sql_commands = sql_file.read()
        cursor.executescript(sql_commands)

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_database()
    print("Database initialized successfully!") 