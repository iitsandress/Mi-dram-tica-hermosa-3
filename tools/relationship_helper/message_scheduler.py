# message_scheduler.py
# Creates a list of thoughtful messages for upcoming dates (no actual sending).
import datetime, json
def upcoming_messages(events):
    today = datetime.date.today()
    reminders = []
    for ev in events:
        d = datetime.date.fromisoformat(ev['date'])
        delta = (d - today).days
        if delta>=0 and delta<=30:
            reminders.append((ev['date'], ev['message']))
    return reminders
if __name__=='__main__':
    events = [{'date':'2025-10-20','message':'Feliz aniversario, amor. Gracias por estar conmigo.'}]
    print(upcoming_messages(events))
