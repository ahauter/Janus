export type Category = "Work/Creativity" |
  "None" |
  "Exercise" |
  "Chores" |
  "Social" |
  "Spiritual" |
  "Sleep";

export const Categories = [
  "None",
  "Work/Creativity",
  "Exercise",
  "Chores",
  "Social",
  "Spiritual",
  "Sleep"];

export const CATEGORIES_TO_COLORS = {
  "Social": ["#4A90E2", "#504BE3", "#4BDEE3"],
  "Sleep": ["#9370DB"],
  "Cooking": ["#FFA07A", "#FF7A97"],
  "Spiritual": ["#B0BEC5"],
  "Chores": ["#FF5900", "#FFD700"],
  "Work/Creativity": ["#FF7F50", "#FFD64F", "#FF4F78"],
  "Exercise": ["#FF2F50", "#FF2EB9"],
  "None": ["#0F0F0F"],
}

export function getCategoryColor(category: Category) {
  return CATEGORIES_TO_COLORS[category][0]
}
