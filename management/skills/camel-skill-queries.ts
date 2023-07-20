class CamelSkillQueries {
    public getSkills(camel: Camel): CamelSkill[] {
        return [camel.agility, camel.sprintSpeed, camel.stamina];
    }
}
