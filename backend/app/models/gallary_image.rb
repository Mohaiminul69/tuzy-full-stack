class GallaryImage < ApplicationRecord
  validates :img_src, presence: true
  validates :img_src, uniqueness: true
end
