# myapp/management/commands/myinspectdb.py
from django.core.management.commands.inspectdb import Command as InspectDBCommand
from django.db import connections
from django.db.backends.base.introspection import TableInfo


class Command(InspectDBCommand):
    def handle(self, *args, **options):
        database = options["database"]
        connection = connections[database]
        connection.introspection.get_table_list = self.get_table_list
        super().handle(*args, **options)

    def get_table_list(self, cursor):
        cursor.execute(
            "SELECT table_name, table_type FROM information_schema.tables WHERE table_schema = 'cmmn'"
        )
        return [
            TableInfo(row[0], "t" if row[1] == "BASE TABLE" else "v")
            for row in cursor.fetchall()
        ]
