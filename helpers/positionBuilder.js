module.exports = function positionBuilder(data) {

  // If a position is selected, it adds it to an array. This array is later used to list the applicable players for the leagues draft. Using a concatanated string as db datatype is tring
  let leaguePositions = '';
  if (data.qb > 0 || data.qb_wr_rb_te > 0) {
    leaguePositions += "QB,";
  }data
  if (data.rb > 0 || data.rb_wr_te > 0 || data.rb_te > 0 || data.qb_wr_rb_te > 0 || data.rb_wr > 0) {
    leaguePositions += "RB,";
  }
  if (data.wr > 0 || data.rb_wr_te > 0 || data.qb_wr_rb_te > 0 || data.rb_wr > 0 || data.wr_te > 0) {
    leaguePositions += "WR,";
  }
  if (data.te > 0 || data.rb_wr_te > 0 || data.rb_te > 0 || data.qb_wr_rb_te > 0 || data.wr_te > 0) {
    leaguePositions += "TE,";
  }
  if (data.k > 0) {
    leaguePositions += "K,";
  }
  if (data.dst > 0) {
    leaguePositions += "DST,";
  }
  if (data.dl > 0 || data.idp > 0 ) {
    leaguePositions += "DL,";
  }
  if (data.lb > 0 || data.idp > 0 ) {
    leaguePositions += "LB,";
  }
  if (data.db > 0 || data.idp > 0 ) {
    leaguePositions += "DB,";
  }
  if (data.de > 0 || data.idp > 0 ) {
    leaguePositions += "DE,";
  }
  if (data.dt > 0 || data.idp > 0 ) {
    leaguePositions += "DT,";
  }
  if (data.cb > 0 || data.idp > 0 ) {
    leaguePositions += "CB,";
  }
  if (data.s > 0 || data.idp > 0 ) {
    leaguePositions += "S,";
  }
  // removes last comma
  return leaguePositions.slice(0, -1);
}
