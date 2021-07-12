export const grabUsersTeamAndId = (teamsList, userId) => {
  const teamIdAndName = {}
  teamsList.forEach(team => {
    team.members.forEach(member => {
      if (Number(member.id) === Number(userId)) {
        teamIdAndName.teamId = team.id;
        teamIdAndName.teamName = team.teamName
      }
    })
  })
  return teamIdAndName
}