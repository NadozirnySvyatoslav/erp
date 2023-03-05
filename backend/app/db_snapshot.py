import subprocess
import sys
from alembic.config import Config
from alembic import command
from app.core.config import ROOT

alembic_cfg = Config(ROOT.parent / "alembic.ini")

#subprocess.run([sys.executable, "./app/backend_pre_start.py"])
#command.upgrade(alembic_cfg, "head")
#subprocess.run([sys.executable, "./app/initial_data.py"])
if len(sys.argv) !=2:
  raise "Need name for snapshot"
command.revision(alembic_cfg, sys.argv[1], autogenerate=True)
