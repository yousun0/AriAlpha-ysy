# myapp/management/commands/myinspectdb.py
from django.db.backends.base.introspection import BaseDatabaseIntrospection
from django.db import connection
from django.core.management.commands.inspectdb import Command as InspectDBCommand
from django.db.backends.base.introspection import TableInfo


class CustomDatabaseIntrospection(BaseDatabaseIntrospection):
    def get_column_comment(self, table_name, schema="cmmn"):
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT 
                    col.name AS column_name,
                    prop.value AS comment
                FROM 
                   sys.tables tbl
                    INNER JOIN sys.columns col ON tbl.object_id = col.object_id
                    LEFT JOIN sys.extended_properties prop ON col.object_id = prop.major_id AND col.column_id = prop.minor_id
                    INNER JOIN sys.schemas sch ON tbl.schema_id = sch.schema_id
                WHERE 
                    tbl.name = %s AND 
                    sch.name = %s AND 
                    prop.name = 'MS_Description'
            """,
                [table_name, schema],
            )
            return dict(cursor.fetchall())

    def get_primary_key_column(self, table_name, schema="cmmn"):
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT 
                    col.name
                FROM 
                    sys.indexes idx
                    INNER JOIN sys.index_columns idxCol ON idx.object_id = idxCol.object_id AND idx.index_id = idxCol.index_id
                    INNER JOIN sys.columns col ON idx.object_id = col.object_id AND idxCol.column_id = col.column_id
                    INNER JOIN sys.tables tbl ON idx.object_id = tbl.object_id
                    INNER JOIN sys.schemas sch ON tbl.schema_id = sch.schema_id
                WHERE 
                    idx.is_primary_key = 1 AND
                    tbl.name = %s AND
                    sch.name = %s
            """,
                [table_name, schema],
            )
            return [row[0] for row in cursor.fetchall()]

    # 여기에 PK 정보 및 시스템 시간 관련 설정 추출 로직 추가


class Command(InspectDBCommand):
    def handle_inspection(self, options):
        introspection = CustomDatabaseIntrospection(connection)
        table2model = lambda table_name: table_name.title().replace("_", "")
        introspection.get_table_list = self.get_table_list
        with connection.cursor() as cursor:
            for table_name in introspection.get_table_list(cursor):
                column_comments = introspection.get_column_comment(
                    table_name, schema="cmmn"
                )
                print(column_comments)
                primary_key_columns = introspection.get_primary_key_column(
                    table_name, schema="cmmn"
                )

                # 테이블 이름을 Django 모델 이름으로 변환
                model_name = table2model(table_name)

                # 모델 클래스 생성
                class_definition = f"class {model_name}(models.Model):\n"

                # 모델 필드 생성 로직
                for column_name, comment in column_comments.items():
                    field_definition = f'    {column_name} = models.CharField(max_length=255, verbose_name="{comment}")\n'
                    class_definition += field_definition

                # 주요 키 정보를 기반으로 모델 필드 설정
                if primary_key_columns:
                    class_definition += f"    class Meta:\n"
                    class_definition += f'        unique_together = ({", ".join(primary_key_columns)})\n'

                # 생성된 모델 클래스를 출력
                self.stdout.write(class_definition)

    def get_table_list(self, cursor):
        cursor.execute(
            "SELECT table_name, table_type FROM information_schema.tables WHERE table_schema = 'cmmn'"
        )
        return [
            TableInfo(row[0], "t" if row[1] == "BASE TABLE" else "v")
            for row in cursor.fetchall()
        ]
