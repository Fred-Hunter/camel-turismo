export var RaceState;
(function (RaceState) {
    RaceState[RaceState["none"] = 0] = "none";
    RaceState[RaceState["triggered"] = 1] = "triggered";
    RaceState[RaceState["initialised"] = 2] = "initialised";
    RaceState[RaceState["inProgress"] = 3] = "inProgress";
    RaceState[RaceState["finished"] = 4] = "finished";
})(RaceState || (RaceState = {}));
