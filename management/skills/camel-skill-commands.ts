class CamelSkillCommands {
    public levelUpSkill(camel: Camel, skill: CamelSkill) {
        const toNextLevel = skill.getXpToNextLevel();

        if (camel.unspentXp >= toNextLevel) {
            skill.addXp(toNextLevel);
            camel.unspentXp -= toNextLevel;
        }
    }
}
