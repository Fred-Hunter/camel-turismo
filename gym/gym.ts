class Gym {
    getTreadmillSession(camel: Camel) {
        return new GymSession(
            camel.camelSkills.sprintSpeed, 
            camel.camelSkills.stamina.level);
    }

    getSpaSession(camel: Camel) {
        
    }
}