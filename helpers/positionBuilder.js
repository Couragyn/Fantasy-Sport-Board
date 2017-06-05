module.exports = function positionBuilder(data) {

  // If a position is selected, it adds it to an array. This array is later used to list the applicable players for the leagues draft
  let leaguePositions = [];
  if (data.qb > 0 || data.qb_wr_rb_te > 0) {
    leaguePositions.push("QB");
  }data
  if (data.rb > 0 || data.rb_wr_te > 0 || data.rb_te > 0 || data.qb_wr_rb_te > 0 || data.rb_wr > 0) {
    leaguePositions.push("RB");
  }
  if (data.wr > 0 || data.rb_wr_te > 0 || data.qb_wr_rb_te > 0 || data.rb_wr > 0 || data.wr_te > 0) {
    leaguePositions.push("WR");
  }
  if (data.te > 0 || data.rb_wr_te > 0 || data.rb_te > 0 || data.qb_wr_rb_te > 0 || data.wr_te > 0) {
    leaguePositions.push("TE");
  }
  if (data.k > 0) {
    leaguePositions.push("K");
  }
  if (data.dst > 0) {
    leaguePositions.push("DST");
  }
  if (data.dl > 0 || data.idp > 0 ) {
    leaguePositions.push("DL");
  }
  if (data.lb > 0 || data.idp > 0 ) {
    leaguePositions.push("LB");
  }
  if (data.db > 0 || data.idp > 0 ) {
    leaguePositions.push("DB");
  }
  if (data.de > 0 || data.idp > 0 ) {
    leaguePositions.push("DE");
  }
  if (data.dt > 0 || data.idp > 0 ) {
    leaguePositions.push("DT");
  }
  if (data.cb > 0 || data.idp > 0 ) {
    leaguePositions.push("CB");
  }
  if (data.s > 0 || data.idp > 0 ) {
    leaguePositions.push("S");
  }

  return leaguePositions;
}
