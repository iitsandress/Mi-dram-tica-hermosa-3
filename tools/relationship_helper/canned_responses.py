# canned_responses.py
# A small library of customizable message templates to repair and strengthen communication.

TEMPLATES = {
    "apology_short": "Lo siento, me equivoqué. ¿Podemos hablar cuando puedas?",
    "apology_long": "Quiero disculparme por lo que pasó. No fue mi intención lastimarte. ¿Te parece si hablamos para arreglarlo?",
    "deescalate": "Siento que esto está subiendo. Quiero entenderte y no pelear. ¿Me ayudas a explicarme cómo te sentiste?",
    "appreciation": "Gracias por estar conmigo. Aprecio cuando haces {x}.",
    "checkin": "¿Cómo estás hoy? Solo quería saber cómo te fue con {x}.",
    "space": "Si necesitas espacio, lo entiendo. Dime cuándo te parece bien hablar."
}
def render(template_key, **kwargs):
    t = TEMPLATES.get(template_key, "")
    return t.format(**kwargs)
if __name__=='__main__':
    print(render("apology_short"))
