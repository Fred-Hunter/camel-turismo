class CamelSkills {
    public sprintSpeed: CamelSkill = new CamelSkill("Sprint Speed");
    public stamina: CamelSkill = new CamelSkill("Stamina");
    public agility: CamelSkill = new CamelSkill("Agility");
}

class CamelSkillsBuilder {
    private readonly _camelSkills = new CamelSkills();

    public withSprintSpeed(value: number) {
        this._camelSkills.sprintSpeed.setLevel(value);
        return this;
    }

    public withAgility(value: number) {
        this._camelSkills.agility.setLevel(value);
        return this;
    }

    public withStamina(value: number) {
        this._camelSkills.stamina.setLevel(value);
        return this;
    }

    public build() {
        return this._camelSkills;
    }
}