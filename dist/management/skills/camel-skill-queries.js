export class CamelSkillQueries {
    getSkills(camel) {
        return [camel.agility, camel.sprintSpeed, camel.stamina];
    }
}
